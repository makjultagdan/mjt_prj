import { useState } from "react";
import "./TodoList.css";

const TodoList = ({ selectedDate, onDateChange }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "React Hooks 심화 학습",
      completed: true,
      date: "2024-08-15",
    },
    {
      id: 2,
      title: "프로젝트 컴포넌트 설계",
      completed: false,
      date: "2024-08-15",
    },
    {
      id: 3,
      title: "일일 회고 작성",
      completed: false,
      date: "2024-08-15",
    },
    {
      id: 4,
      title: "운동하기 (30분)",
      completed: true,
      date: "2024-08-15",
    },
  ]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedTask, setSelectedTask] = useState(null);

  // 현재 선택된 날짜 (외부에서 전달받거나 기본값으로 오늘)
  const currentDate = selectedDate || new Date();

  // 날짜를 YYYY-MM-DD 형식으로 변환
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 현재 선택된 날짜의 투두 목록만 필터링
  const currentDateString = formatDate(currentDate);
  const filteredTasks = tasks.filter((task) => task.date === currentDateString);

  // 날짜 표시 형식
  const displayDate = () => {
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[currentDate.getDay()];
    return `${month}월 ${day}일 (${weekday})`;
  };

  // 이전 날짜로 이동
  const goToPreviousDate = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    if (onDateChange) {
      onDateChange(prevDate);
    }
  };

  // 다음 날짜로 이동
  const goToNextDate = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    if (onDateChange) {
      onDateChange(nextDate);
    }
  };

  // 오늘로 돌아가기
  const goToToday = () => {
    const today = new Date();
    if (onDateChange) {
      onDateChange(today);
    }
  };

  const toggleCheck = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleMenuClick = (task, event) => {
    event.preventDefault();
    setSelectedTask(task);
    setModalPosition({
      top: event.clientY,
      left: event.clientX,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleEdit = () => {
    if (selectedTask) {
      setEditingTaskId(selectedTask.id);
      setEditingText(selectedTask.title);
      closeModal();
    }
  };

  const handleDelete = () => {
    if (selectedTask) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== selectedTask.id)
      );
      closeModal();
    }
  };

  const handleEditKeyPress = (e, taskId) => {
    if (e.key === "Enter") {
      handleSaveEdit(taskId);
    }
  };

  const handleSaveEdit = (taskId) => {
    if (editingText.trim()) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, title: editingText.trim() } : task
        )
      );
    }
    setEditingTaskId(null);
    setEditingText("");
  };

  const completed = filteredTasks.filter((t) => t.completed);
  const uncompleted = filteredTasks.filter((t) => !t.completed);

  return (
    <div className="todo-container">
      <div className="todo-header">
        <div className="todo-date-nav">
          <div className="date-nav-center">
            <button className="date-nav-btn prev" onClick={goToPreviousDate}>
              ‹
            </button>
            <span
              className="todo-date"
              onClick={goToToday}
              style={{ cursor: "pointer" }}
            >
              {displayDate()}
            </span>
            <button className="date-nav-btn next" onClick={goToNextDate}>
              ›
            </button>
          </div>
          <button className="todo-add-btn">+</button>
        </div>
      </div>

      <div className="todo-content">
        <div className="todo-list">
          {[...uncompleted, ...completed].map((task) => (
            <div key={task.id} className="todo-item-wrapper">
              <div className="todo-checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCheck(task.id)}
                  className="todo-checkbox-input"
                />
                <div className="todo-checkbox-custom">
                  {task.completed && <span className="checkmark">✓</span>}
                </div>
              </div>
              <div className="todo-text-wrapper">
                {editingTaskId === task.id ? (
                  <div className="todo-edit-wrapper">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={(e) => handleEditKeyPress(e, task.id)}
                      onBlur={() => handleSaveEdit(task.id)}
                      className="todo-edit-input"
                      autoFocus
                    />
                  </div>
                ) : (
                  <span
                    className={`todo-text ${task.completed ? "completed" : ""}`}
                  >
                    {task.title}
                  </span>
                )}
              </div>
              <div className="todo-actions">
                <button
                  className="todo-menu-btn"
                  onClick={(e) => handleMenuClick(task, e)}
                >
                  ⋯
                </button>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="todo-empty">
              <div className="empty-icon">📝</div>
              <p>일정을 추가해주세요!</p>
            </div>
          )}
        </div>
      </div>

      {/* 메뉴 모달 */}
      {showModal && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div
            className="todo-menu-modal"
            style={{
              position: "absolute",
              top: modalPosition.top,
              left: modalPosition.left,
              zIndex: 1000,
            }}
          >
            <button className="menu-option edit-option" onClick={handleEdit}>
              ✏️ 수정하기
            </button>
            <button
              className="menu-option delete-option"
              onClick={handleDelete}
            >
              🗑️ 삭제하기
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
