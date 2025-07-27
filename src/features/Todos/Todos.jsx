import { useState, useMemo, useCallback, useEffect } from 'react'
import styles from './Todos.module.css'
import BtnDel from './btnDel'
import { useTodos, useCreateTodo, useUpdateTodo } from './Query/todoQueries'
import { useNavigate } from 'react-router'

function Todos() {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  // Lấy danh sách todos từ API
  const { data: todos = [], isLoading, isError, error } = useTodos();
  
  // Mutations để tạo và cập nhật todo
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();

  // Kiểm tra xem người dùng đã đăng nhập chưa
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    // if (!token) {
    //   navigate('/login');
    // }
  }, [navigate]);

  // Sử dụng useCallback để tối ưu performance
  const handleDelete = useCallback((id) => {
    // Xử lý UI sau khi xóa - API call được xử lý trong btnDel.jsx
    console.log('Todo đã được xóa:', id);
  }, []);

  const handleToggleComplete = useCallback((id, completed) => {
    updateTodoMutation.mutate(
      { 
        id, 
        data: { completed: !completed } 
      },
      {
        onError: (error) => {
          console.error('Lỗi khi cập nhật trạng thái todo:', error);
          alert('Không thể cập nhật trạng thái todo. Vui lòng thử lại sau.');
        }
      }
    );
  }, [updateTodoMutation]);

  const handleAdd = () => {
    if (newTodo.trim() !== '') {
      createTodoMutation.mutate(
        { 
          title: newTodo,
          completed: false
        },
        {
          onSuccess: () => {
            setNewTodo('');
          },
          onError: (error) => {
            console.error('Lỗi khi tạo todo mới:', error);
            alert('Không thể tạo todo mới. Vui lòng thử lại sau.');
          }
        }
      );
    }
  }

  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setEditingId(id);
      setEditText(todoToEdit.title);
    }
  }

  const handleSaveEdit = () => {
    if (editText.trim() !== '' && editingId) {
      updateTodoMutation.mutate(
        { 
          id: editingId, 
          data: { title: editText } 
        },
        {
          onSuccess: () => {
            setEditingId(null);
            setEditText('');
          },
          onError: (error) => {
            console.error('Lỗi khi cập nhật todo:', error);
            alert('Không thể cập nhật todo. Vui lòng thử lại sau.');
          }
        }
      );
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  }

  // Lọc todos theo trạng thái
  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Hiển thị thông báo lỗi nếu có
  if (isError) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Todo List</h1>
        <div className={styles.errorMessage}>
          Đã xảy ra lỗi: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>

      <div className={styles.card}>
        <div className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Thêm công việc mới"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={createTodoMutation.isPending}
          />
          <button 
            className={styles.button}
            onClick={handleAdd}
            disabled={createTodoMutation.isPending}
          >
            {createTodoMutation.isPending ? 'Đang thêm...' : 'Thêm'}
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.filterContainer}>
          <button 
            className={`${styles.filterButton} ${filter === 'all' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất cả
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'active' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('active')}
          >
            Chưa hoàn thành
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'completed' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('completed')}
          >
            Đã hoàn thành
          </button>
        </div>

        {isLoading ? (
          <div className={styles.loading}>Đang tải dữ liệu...</div>
        ) : (
          <ul className={styles.todoList}>
            {filteredTodos.length === 0 ? (
              <li className={styles.emptyState}>
                Không có công việc nào
              </li>
            ) : (
              filteredTodos.map((todo) => (
                <li key={todo.id} className={styles.todoItem}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id, todo.completed)}
                    disabled={updateTodoMutation.isPending}
                  />
                  
                  {editingId === todo.id ? (
                    <>
                      <input
                        className={styles.editInput}
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleEditKeyDown}
                        autoFocus
                        disabled={updateTodoMutation.isPending}
                      />
                      <button 
                        className={styles.saveButton}
                        onClick={handleSaveEdit}
                        disabled={updateTodoMutation.isPending}
                      >
                        {updateTodoMutation.isPending ? 'Đang lưu...' : 'Lưu'}
                      </button>
                      <button 
                        className={styles.cancelButton}
                        onClick={handleCancelEdit}
                        disabled={updateTodoMutation.isPending}
                      >
                        Hủy
                      </button>
                    </>
                  ) : (
                    <>
                      <span className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}>
                        {todo.title}
                      </span>
                      <div className={styles.todoActions}>
                        <button 
                          className={styles.editButton}
                          onClick={() => handleEdit(todo.id)}
                          disabled={updateTodoMutation.isPending}
                        >
                          Sửa
                        </button>
                        <BtnDel todo={todo} handleDelete={handleDelete} styles={styles} />
                      </div>
                    </>
                  )}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Todos
