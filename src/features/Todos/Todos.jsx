import { useState, useMemo, useCallback, useEffect } from 'react'
import styles from './Todos.module.css'
import BtnDel from './btnDel'

function Todos() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (e) {
        console.error('Error parsing saved todos', e);
      }
    }
    return [
      { id: 1, text: 'Buy groceries', completed: false },
      { id: 2, text: 'Finish homework', completed: true },
      { id: 3, text: 'Call mom', completed: false },
    ];
  });
  
  const [newTodo, setNewTodo] = useState('')
  const [iterations, setIterations] = useState(10000000)
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  // Lưu todos vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Expensive calculation function
  const calculateExpensiveValue = (n) => {
    console.log('Calculating expensive value...')
    let result = 0
    for (let i = 0; i < n; i++) {
      result += Math.sin(i) * Math.cos(i)
    }
    return result.toFixed(2)
  }

  // Expensive calculation that runs on every render
  const expensiveValue = useMemo(() => calculateExpensiveValue(iterations), [iterations])

  // Sử dụng useCallback để tối ưu performance
  const handleDelete = useCallback((id) => {
    console.log('--- handleDelete ---')
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }, [])

  const handleToggleComplete = useCallback((id) => {
    setTodos(prevTodos => prevTodos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }, [])

  const handleAdd = () => {
    if (newTodo.trim() !== '') {
      const newId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1
      setTodos(prevTodos => [...prevTodos, { id: newId, text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setEditingId(id);
      setEditText(todoToEdit.text);
    }
  }

  const handleSaveEdit = () => {
    if (editText.trim() !== '') {
      setTodos(prevTodos => prevTodos.map(todo => 
        todo.id === editingId ? { ...todo, text: editText } : todo
      ));
      setEditingId(null);
      setEditText('');
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
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>

      <div className={styles.card}>
        <div className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Add new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            className={styles.button}
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.filterContainer}>
          <button 
            className={`${styles.filterButton} ${filter === 'all' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'active' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'completed' ? styles.filterButtonActive : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <ul className={styles.todoList}>
          {filteredTodos.length === 0 ? (
            <li className={styles.emptyState}>
              No todos to display
            </li>
          ) : (
            filteredTodos.map((todo) => (
              <li key={todo.id} className={styles.todoItem}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
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
                    />
                    <button 
                      className={styles.saveButton}
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                    <button 
                      className={styles.cancelButton}
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}>
                      {todo.text}
                    </span>
                    <div className={styles.todoActions}>
                      <button 
                        className={styles.editButton}
                        onClick={() => handleEdit(todo.id)}
                      >
                        Edit
                      </button>
                      <BtnDel todo={todo} handleDelete={handleDelete} styles={styles} />
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className={styles.card}>
        <p>Expensive calculation result: {expensiveValue}</p>
        <input
          type="range"
          min="1000000"
          max="50000000"
          value={iterations}
          onChange={(e) => setIterations(Number(e.target.value))}
        />
        <p>Iterations: {iterations}</p>
      </div>
    </div>
  )
}

export default Todos
