import { useState, useRef, useEffect } from "react";
import TaskMenuModal from "./TaskMenuModal";

const TodoItem = ({ task, onToggle, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const inputRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".task-menu") &&
        !e.target.closest(".task-menu-popup")
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (showMenu && menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 4, left: rect.left });
    }
  }, [showMenu]);

  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleSave = () => {
    if (editedTitle.trim() !== "") {
      onEdit(task.id, editedTitle);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div className="completed-task">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="task-checkbox"
      />

      <div
        className={`task-icon task-${task.color || "blue"}`}
        onClick={() => onToggle(task.id)}>
        {task.completed && <div className="checkmark"></div>}
      </div>

      {isEditing ? (
        <input
          ref={inputRef}
          className="task-edit-input"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
        />
      ) : (
        <span className="task-title">{task.title}</span>
      )}

      <button
        className="task-menu"
        onClick={() => setShowMenu(!showMenu)}
        ref={menuButtonRef}>
        ⋯
      </button>

      {showMenu && (
        <div
          className="task-menu-wrapper"
          style={{
            position: "absolute",
            top: `${menuPos.top}px`,
            left: `${menuPos.left}px`,
            zIndex: 999,
          }}>
          <TaskMenuModal
            onEdit={handleEdit}
            onDelete={() => {
              onDelete(task.id);
              setShowMenu(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TodoItem;
