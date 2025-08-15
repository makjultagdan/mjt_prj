import { useState, useEffect } from "react";
import "./Calendar.css";

const Calendar = ({ onDateChange, selectedDate: externalSelectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({
    // 8월 15일 목업 데이터
    "2024-08-15": [
      { text: "React 학습", color: "blue" },
      { text: "운동", color: "green" },
    ],
  });
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ text: "", color: "blue" });

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const eventColors = [
    { name: "blue", label: "파랑", class: "event-blue" },
    { name: "red", label: "빨강", class: "event-red" },
    { name: "green", label: "초록", class: "event-green" },
    { name: "yellow", label: "노랑", class: "event-yellow" },
  ];

  // 외부에서 선택된 날짜가 있으면 현재 날짜로 설정
  useEffect(() => {
    if (externalSelectedDate) {
      setCurrentDate(new Date(externalSelectedDate));
    }
  }, [externalSelectedDate]);

  // 현재 월의 첫 번째 날과 마지막 날 계산
  const getMonthData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDay.getDay();
    const lastDate = lastDay.getDate();

    // 이전 달의 마지막 날들
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = [];
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push({
        day: prevMonthLastDay - i,
        prevMonth: true,
        date: new Date(year, month - 1, prevMonthLastDay - i),
      });
    }

    // 현재 달의 날들
    const currentMonthDays = [];
    for (let i = 1; i <= lastDate; i++) {
      const currentDate = new Date(year, month, i);
      const dateString = currentDate.toISOString().split("T")[0];
      currentMonthDays.push({
        day: i,
        date: currentDate,
        events: events[dateString] || [],
        isToday: isToday(currentDate),
        isSelected: isSelectedDate(currentDate),
      });
    }

    // 다음 달의 첫 번째 날들
    const nextMonthDays = [];
    const remainingCells =
      42 - (prevMonthDays.length + currentMonthDays.length);
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push({
        day: i,
        nextMonth: true,
        date: new Date(year, month + 1, i),
      });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // 오늘 날짜인지 확인
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // 선택된 날짜인지 확인
  const isSelectedDate = (date) => {
    if (!externalSelectedDate) return false;
    return date.toDateString() === externalSelectedDate.toDateString();
  };

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  // 현재 달로 돌아가기
  const goToCurrentMonth = () => {
    const today = new Date();
    setCurrentDate(today);
    if (onDateChange) {
      onDateChange(today);
    }
  };

  // 날짜 클릭 시 날짜 변경만 (이벤트 모달은 더블클릭에서)
  const handleDateClick = (dayData) => {
    if (!dayData.prevMonth && !dayData.nextMonth) {
      // 부모 컴포넌트에 날짜 변경 알림
      if (onDateChange) {
        onDateChange(dayData.date);
      }
    }
  };

  // 날짜 더블클릭 시 이벤트 모달 열기
  const handleDateDoubleClick = (dayData) => {
    if (!dayData.prevMonth && !dayData.nextMonth) {
      setSelectedDate(dayData.date);
      setShowEventModal(true);
    }
  };

  // 이벤트 추가
  const addEvent = () => {
    if (newEvent.text.trim()) {
      const dateString = selectedDate.toISOString().split("T")[0];
      const updatedEvents = { ...events };

      if (!updatedEvents[dateString]) {
        updatedEvents[dateString] = [];
      }

      updatedEvents[dateString].push({
        ...newEvent,
        id: Date.now(),
      });

      setEvents(updatedEvents);
      setNewEvent({ text: "", color: "blue" });
      setShowEventModal(false);
    }
  };

  // 이벤트 삭제
  const deleteEvent = (dateString, eventIndex) => {
    const updatedEvents = { ...events };
    updatedEvents[dateString].splice(eventIndex, 1);

    if (updatedEvents[dateString].length === 0) {
      delete updatedEvents[dateString];
    }

    setEvents(updatedEvents);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowEventModal(false);
    setNewEvent({ text: "", color: "blue" });
  };

  const calendarDays = getMonthData(currentDate);
  const monthYear = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월`;

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button className="nav-button prev" onClick={goToPreviousMonth}>
            ‹
          </button>
          <span
            className="month-year"
            onClick={goToCurrentMonth}
            style={{ cursor: "pointer" }}>
            {monthYear}
          </span>
          <button className="nav-button next" onClick={goToNextMonth}>
            ›
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-days-header">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-header">
              <div className="day-short">{day}</div>
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {calendarDays.map((dayData, index) => (
            <div
              key={index}
              className={`calendar-day ${
                dayData.prevMonth || dayData.nextMonth ? "other-month" : ""
              } ${dayData.isToday ? "today" : ""} ${
                dayData.isSelected ? "selected" : ""
              }`}
              onClick={() => handleDateClick(dayData)}
              onDoubleClick={() => handleDateDoubleClick(dayData)}
              style={{
                cursor:
                  dayData.prevMonth || dayData.nextMonth
                    ? "default"
                    : "pointer",
              }}>
              <span className="day-number">{dayData.day}</span>
              {dayData.events && dayData.events.length > 0 && (
                <div className="events">
                  {dayData.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`event event-${event.color}`}
                      title={event.text}>
                      {event.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 이벤트 모달 */}
      {showEventModal && (
        <div className="event-modal-overlay" onClick={closeModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <div className="event-modal-header">
              <h3>
                {selectedDate?.toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <button className="close-button" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="event-modal-content">
              {/* 기존 이벤트 목록 */}
              {selectedDate &&
                events[selectedDate.toISOString().split("T")[0]] && (
                  <div className="existing-events">
                    <h4>기존 일정</h4>
                    {events[selectedDate.toISOString().split("T")[0]].map(
                      (event, index) => (
                        <div key={index} className="existing-event">
                          <span className={`event-badge event-${event.color}`}>
                            {event.text}
                          </span>
                          <button
                            className="delete-event-btn"
                            onClick={() =>
                              deleteEvent(
                                selectedDate.toISOString().split("T")[0],
                                index
                              )
                            }>
                            삭제
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}

              {/* 새 이벤트 추가 */}
              <div className="add-event-section">
                <h4>새 일정 추가</h4>
                <div className="event-input-group">
                  <input
                    type="text"
                    placeholder="일정을 입력하세요"
                    value={newEvent.text}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, text: e.target.value })
                    }
                    className="event-input"
                  />
                  <div className="color-picker">
                    {eventColors.map((color) => (
                      <button
                        key={color.name}
                        className={`color-option ${
                          newEvent.color === color.name ? "selected" : ""
                        }`}
                        style={{ backgroundColor: getColorValue(color.name) }}
                        onClick={() =>
                          setNewEvent({ ...newEvent, color: color.name })
                        }
                        title={color.label}
                      />
                    ))}
                  </div>
                  <button
                    className="add-event-btn"
                    onClick={addEvent}
                    disabled={!newEvent.text.trim()}>
                    추가
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 색상 값 반환 함수
const getColorValue = (colorName) => {
  const colorMap = {
    blue: "#e3f2fd",
    red: "#ffebee",
    green: "#e8f5e8",
    yellow: "#fff8e1",
  };
  return colorMap[colorName] || "#e3f2fd";
};

export default Calendar;
