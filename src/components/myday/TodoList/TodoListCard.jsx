import styles from "./TodoListCard.module.css";

const TodoCard = ({ todo, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div
      className={`${styles.card} ${todo.completed ? styles.completedCard : ""}`}
    >
      <div className={styles.header}>
        <div className={styles.left}>
          <button
            className={`${styles.checkIcon} ${
              todo.completed ? styles.checked : ""
            }`}
            onClick={onToggleComplete}
            aria-label={todo.completed ? "완료 해제" : "완료"}
          >
            {todo.completed ? (
              <img
                src="/images/todolist-circlecheck.png"
                alt="완료"
                className={styles.icon}
              />
            ) : (
              <img
                src="/images/todolist-circle.png"
                alt="미완료"
                className={styles.icon}
              />
            )}
          </button>

          <div className={styles.todoName}>
            <h2 className={todo.completed ? styles.doneText : ""}>
              {todo.task || "할 일"}
            </h2>
            {todo.priority && (
              <img
                src="/images/todolist-warning.png"
                alt="우선순위"
                className={styles.priority}
              />
            )}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.deadline}>
            <span className={styles.date}>
              {todo.date && todo.time
                ? `${todo.date} / ${todo.time}`
                : todo.date || todo.time || ""}
            </span>
          </div>
          <div className={styles.icons}>
            <button onClick={onEdit}>
              <img
                src="/images/todolist-edit.png"
                alt="수정"
                className={styles.iconBtn}
              />
            </button>
            <button onClick={onDelete}>
              <img
                src="/images/todolist-trash.png"
                alt="삭제"
                className={styles.iconBtn}
              />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {todo.category && <div className={styles.tag}>{todo.category}</div>}
        {todo.memo && <div className={styles.memo}>{todo.memo}</div>}
      </div>
    </div>
  );
};

export default TodoCard;
