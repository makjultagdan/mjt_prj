import { useState } from "react";
import styles from "./TodoListModal.module.css";

const TodoListModal = ({ onClose, onSubmit }) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState(false);
  const [memo, setMemo] = useState("");

  const handleSubmit = () => {
    const newTodo = { task, category, date, time, priority, memo };
    onSubmit(newTodo);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1 className={styles.title}>계획 작성</h1>
        <button className={styles.closeBtn} onClick={onClose}>
          <img src="../public/images/todolist-close.png" alt="닫기" />
        </button>

        <div className={styles.formGroup}>
          <label>할 일</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>태그</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>시간</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>메모</label>
          <input
            type="textarea"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>

        <div className={styles.btnBox}>
          <button
            className={`${styles.priorityBtn} ${priority ? styles.active : ""}`}
            onClick={() => setPriority(!priority)}
          >
            !!우선!!
          </button>
          <button className={styles.submitBtn} onClick={handleSubmit}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoListModal;
