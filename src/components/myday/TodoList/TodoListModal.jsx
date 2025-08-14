import { useEffect, useState } from "react";
import styles from "./TodoListModal.module.css";

const TodoListModal = ({ onClose, onSubmit, initialTodo }) => {
  const isEdit = !!initialTodo; //boolean타입 명시

  const [task, setTask] = useState("");
  const [taskError, setTaskError] = useState(false);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState(false);
  const [memo, setMemo] = useState("");

  // 수정 모드일 때 초기값 채우기
  useEffect(() => {
    if (isEdit) {
      setTask(initialTodo.task ?? "");
      setCategory(initialTodo.category ?? "");
      setDate(initialTodo.date ?? "");
      setTime(initialTodo.time ?? "");
      setPriority(!!initialTodo.priority);
      setMemo(initialTodo.memo ?? "");
    }
  }, [isEdit, initialTodo]);

  const handleSubmit = () => {
    //할 일 필수 작성
    if (!task.trim()) {
      setTaskError(true);
      return;
    }
    setTaskError(false);

    const base = {
      task,
      category,
      date,
      time,
      priority,
      memo,
    };

    const newTodo = isEdit
      ? {
          ...initialTodo, // id, completed 보존
          ...base,
        }
      : {
          id: Date.now(),
          completed: false,
          ...base,
        };

    onSubmit(newTodo);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1 className={styles.title}>{isEdit ? "계획 수정" : "계획 작성"}</h1>
        <button className={styles.closeBtn} onClick={onClose}>
          <img src="/images/todolist-close.png" alt="닫기" />
        </button>

        <div className={styles.formGroup}>
          <label>할 일</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="할 일은 무엇인가요?"
            className={taskError ? styles.errorInput : ""}
          />
          {taskError && (
            <p className={styles.errormessage}>할 일을 입력해주세요!!</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>태그</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="태그를 입력해주세요"
          />
        </div>

        <div className={styles.formGroup}>
          <label>날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>시간</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="memo">메모</label>
          <textarea
            id="memo"
            rows={3}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요"
          />
        </div>

        <div className={styles.btnBox}>
          <button
            className={`${styles.priorityBtn} ${priority ? styles.active : ""}`}
            onClick={() => setPriority(!priority)}
          >
            !! 중요 !!
          </button>
          <button className={styles.submitBtn} onClick={handleSubmit}>
            {isEdit ? "수정하기" : "등록하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoListModal;
