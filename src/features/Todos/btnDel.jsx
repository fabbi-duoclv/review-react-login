import { memo } from 'react'

function BtnDel({todo, handleDelete, styles}) {
    console.log('--- BtnDel ---')
    return (
        <button 
        className={styles.deleteButton}
        onClick={() => handleDelete(todo.id)}
      >
        Delete
      </button>
    )
}

// Sử dụng custom compare function để chỉ re-render khi id thay đổi
export default memo(BtnDel, (prevProps, nextProps) => {
  return prevProps.todo.id === nextProps.todo.id;
})