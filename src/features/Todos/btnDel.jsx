import { memo } from 'react'
import { useDeleteTodo } from './Query/todoQueries'

function BtnDel({ todo, handleDelete, styles }) {
  const deleteMutation = useDeleteTodo();

  const handleClick = () => {
    // Gọi API xóa todo
    deleteMutation.mutate(todo.id, {
      onSuccess: () => {
        // Sau khi xóa thành công, cập nhật UI
        handleDelete(todo.id);
      },
      onError: (error) => {
        console.error('Lỗi khi xóa todo:', error);
        alert('Không thể xóa todo. Vui lòng thử lại sau.');
      }
    });
  }

  return (
    <button 
      className={styles.deleteButton}
      onClick={handleClick}
      disabled={deleteMutation.isPending}
    >
      {deleteMutation.isPending ? 'Đang xóa...' : 'Xóa'}
    </button>
  )
}

export default memo(BtnDel)