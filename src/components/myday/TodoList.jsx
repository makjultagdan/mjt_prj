import { useState, useEffect } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "알고리즘 문제 2개", completed: true },
    { id: 2, title: "React 프로젝트 설정", completed: true },
    { id: 3, title: "밀린 강의 듣기", completed: false },
    { id: 4, title: "사이드 프로젝트 git 생성", completed: false },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const toggleCheck = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleMenuClick = (task, event) => {
    const rect = event.target.getBoundingClientRect();
    setModalPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX - 100, // 100px 왼쪽으로 이동
    });
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleEdit = () => {
    setEditingTaskId(selectedTask.id);
    setEditingText(selectedTask.title);
    setShowModal(false);
  };

  const handleSaveEdit = (taskId) => {
    if (editingText.trim()) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, title: editingText.trim() } : task
        )
      );
    }
    setEditingTaskId(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingText("");
  };

  const handleEditKeyPress = (e, taskId) => {
    if (e.key === "Enter") {
      handleSaveEdit(taskId);
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleDelete = () => {
    setTasks((prev) => prev.filter((task) => task.id !== selectedTask.id));
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showModal) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showModal]);

  const completed = tasks.filter((t) => t.completed);
  const uncompleted = tasks.filter((t) => !t.completed);

  return (
    <div className="todo-container">
      <div className="todo-header">
        <div className="todo-date-nav">
          <button className="date-nav-btn prev">‹</button>
          <span className="todo-date">7월 7일 (화)</span>
          <button className="date-nav-btn next">›</button>
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
                    className={`todo-text ${
                      task.completed ? "completed" : ""
                    }`}>
                    {task.title}
                  </span>
                )}
              </div>
              <div className="todo-actions">
                <button
                  className="todo-menu-btn"
                  onClick={(e) => handleMenuClick(task, e)}>
                  ⋯
                </button>
              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="todo-empty">
              <div className="empty-icon">📝</div>
              <p>아직 할 일이 없습니다</p>
              <small>새로운 할 일을 추가해보세요!</small>
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
            }}>
            <button className="menu-option edit-option" onClick={handleEdit}>
              ✏️ 수정하기
            </button>
            <button
              className="menu-option delete-option"
              onClick={handleDelete}>
              🗑️ 삭제하기
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
