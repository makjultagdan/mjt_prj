import React, { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import HeaderBar from "../components/myday/HeaderBar";
import Calendar from "../components/myday/Calendar";
import TodayReview from "../components/myday/TodayReview";
import TodoList from "../components/myday/TodoList";
import "./MydayPage.css";

const MydayPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 날짜 변경 핸들러
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div className="myday-container">
      <Sidebar />
      <div className="myday-content">
        <HeaderBar />
        <div className="myday-white-container">
          <div className="myday-body">
            <div className="myday-left-section">
              <div className="myday-calendar-section">
                <Calendar
                  onDateChange={handleDateChange}
                  selectedDate={selectedDate}
                />
              </div>
              <div className="myday-review-section">
                <TodayReview />
              </div>
            </div>
            <div className="myday-right-section">
              <div className="myday-todo-section">
                <TodoList
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MydayPage;
