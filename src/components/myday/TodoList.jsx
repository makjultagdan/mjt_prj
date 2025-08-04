import { useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "알고리즘 문제 2개", completed: true },
    { id: 2, title: "React 프로젝트 설정", completed: true },
    { id: 3, title: "밀린 강의 듣기", completed: false },
    { id: 4, title: "사이드 프로젝트 git 생성", completed: false },
  ]);

  const toggleCheck = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completed = tasks.filter((t) => t.completed);
  const uncompleted = tasks.filter((t) => !t.completed);

  return (
    <div className="todo-section">
      <div className="todo-container">
        <h4 className="todo-date">◀ 7/7(화) ▶</h4>

        <div className="completed-tasks">
          {[...uncompleted, ...completed].map((task) => (
            <TodoItem key={task.id} task={task} toggleCheck={toggleCheck} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
