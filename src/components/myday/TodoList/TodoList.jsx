import { useState } from "react";
import TodoListModal from "./TodoListModal";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const handleAddTodo = (newTodo) => {
    setTodoList((prev) => [...prev, newTodo]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📘 나의 계획</h1>
      <button
        className={styles.openModalBtn}
        onClick={() => setIsModalOpen(true)}
      >
        계획 추가하기
      </button>

      {isModalOpen && (
        <TodoListModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTodo}
        />
      )}

      <ul className={styles.todoList}>
        {todoList.map((todo, idx) => (
          <li key={idx} className={styles.todoItem}>
            <strong>{todo.task}</strong> | {todo.date} {todo.time}
            <br />
            태그: {todo.category} / 우선순위: {todo.priority ? "⭕️" : "❌"}
            <br />
            메모: {todo.memo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
