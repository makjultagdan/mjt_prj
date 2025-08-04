import "./TaskMenuModal.css";

const TaskMenuModal = ({ onEdit, onDelete }) => {
  return (
    <div className="task-menu-popup">
      <button className="task-menu-option" onClick={onEdit}>
        ✏️수정하기
      </button>
      <button className="task-menu-option" onClick={onDelete}>
        🗑 삭제하기
      </button>
    </div>
  );
};

export default TaskMenuModal;
