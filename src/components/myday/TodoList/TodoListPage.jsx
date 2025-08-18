import { useMemo, useState, useEffect } from "react";
import TodoListModal from "./TodoListModal";
import TodoListCard from "./TodoListCard";
import styles from "./TodoListPage.module.css";
import AddIcon from "./todolist-add.svg";

const STORAGE_KEY = "todo-list:v1";

const mockTododata = [
  {
    task: "React 과제 제출",
    category: "프론트엔드",
    date: "2025-08-08",
    time: "14:00",
    memo: "GitHub에 푸시 후 PR 보내기",
    priority: true,
  },
  {
    task: "스터디 발표 준비",
    category: "CS",
    date: "2025-08-09",
    time: "10:00",
    memo: "TCP/IP 발표",
    priority: false,
  },
  {
    task: "Next.js",
    category: "Next",
    date: "",
    time: "",
    memo: "테스트",
    priority: false,
  },
];

function toDate(d, t) {
  // 날짜가 없으면 아주 큰 날짜로 취급해서 항상 뒤로
  if (!d) return new Date(8640000000000000);
  return new Date(`${d}T${t || "00:00"}`);
}

const TodoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // 있으면 수정 모드
  const [showCompleted, setShowCompleted] = useState(false);

  // 최초 로드: localStorage → 상태 복원, 없으면 mock으로
  const [todoList, setTodoList] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data) && data.length > 0) {
          return data.map((t, idx) => ({
            id: t.id ?? Date.now() + idx,
            task: t.task ?? "",
            category: t.category ?? "",
            date: t.date ?? "",
            time: t.time ?? "",
            priority: !!t.priority,
            memo: t.memo ?? "",
            completed: !!t.completed,
          }));
        }
      }
    } catch (e) {
      console.warn("localStorage parse error:", e);
    }
    // 없거나 빈 배열이면 mock으로 시드
    return mockTododata.map((t, idx) => ({
      id: Date.now() + idx,
      ...t,
      completed: false,
    }));
  });

  // 변경될 때마다 localStorage 저장
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
    } catch (e) {
      console.warn("localStorage set error:", e);
    }
  }, [todoList]);

  const openCreate = () => {
    setEditTarget(null);
    setIsModalOpen(true);
  };
  const openEdit = (todo) => {
    setEditTarget(todo);
    setIsModalOpen(true);
  };

  // 모달에서 저장 눌렀을 때 (생성/수정 공용)
  const handleSubmitFromModal = (todo) => {
    if (todo.id && todoList.some((t) => t.id === todo.id)) {
      // 수정
      setTodoList((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, ...todo } : t))
      );
    } else {
      // 생성
      setTodoList((prev) => [...prev, todo]);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setTodoList((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodoList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // 마감일(날짜+시간) 오름차순
  const byDeadlineAsc = (a, b) => {
    const da = toDate(a.date, a.time);
    const db = toDate(b.date, b.time);
    if (da < db) return -1;
    if (da > db) return 1;
    return 0;
  };

  const activeTodos = useMemo(
    () => todoList.filter((t) => !t.completed).sort(byDeadlineAsc),
    [todoList]
  );
  const completedTodos = useMemo(
    () => todoList.filter((t) => t.completed).sort(byDeadlineAsc),
    [todoList]
  );

  return (
    <div className={styles.container}>
      <header className={styles.listhead}>
        <h1 className={styles.title}>To Do List</h1>

        <div className={styles.headerRow}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabBtn} ${
                !showCompleted ? styles.tabBtnActive : ""
              }`}
              onClick={() => setShowCompleted(false)}
            >
              진행 중
            </button>
            <button
              className={`${styles.tabBtn} ${
                showCompleted ? styles.tabBtnActive : ""
              }`}
              onClick={() => setShowCompleted(true)}
            >
              완료된
            </button>
          </div>

          <button className={styles.addtodo} onClick={openCreate}>
            <img src={AddIcon} alt="추가" className={styles.addIcon} />
          </button>
        </div>
      </header>

      {isModalOpen && (
        <TodoListModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitFromModal}
          initialTodo={editTarget} // 있으면 수정 모드
        />
      )}

      <div className={styles.cardWrapper}>
        {(showCompleted ? completedTodos : activeTodos).length === 0 ? (
          <p style={{ color: "#777" }}>
            {showCompleted
              ? "완료된 항목이 없습니다."
              : "할 일을 추가하거나 완료해보세요."}
          </p>
        ) : (
          (showCompleted ? completedTodos : activeTodos).map((todo) => (
            <TodoListCard
              key={todo.id}
              todo={todo}
              onToggleComplete={() => toggleComplete(todo.id)}
              onEdit={() => openEdit(todo)}
              onDelete={() => handleDelete(todo.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
