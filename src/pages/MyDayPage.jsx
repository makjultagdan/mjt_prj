import React from "react";
import Sidebar from "../components/common/Sidebar";
import HeaderBar from "../components/myday/HeaderBar";
import Calendar from "../components/myday/Calendar";
import TodayReview from "../components/myday/TodayReview";
import TodoList from "../components/myday/TodoList";
import "./MydayPage.css";

const MydayPage = () => {
  return (
    <div className="myday-container">
      <Sidebar />
      <div className="myday-content">
        <HeaderBar />
        <div className="myday-white-container">
          <div className="myday-body">
            <div className="myday-left-section">
              <div className="myday-calendar-section">
                <Calendar />
              </div>
              <div className="myday-review-section">
                <TodayReview />
              </div>
            </div>
            <div className="myday-right-section">
              <div className="myday-todo-section">
                <TodoList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MydayPage;
