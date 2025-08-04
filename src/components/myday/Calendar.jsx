import "./Calendar.css";

const Calendar = () => {
  const daysOfWeek = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const shortDays = ["일", "월", "화", "수", "목", "금", "토"];

  const calendarDays = [
    { day: 29, prevMonth: true },
    { day: 30, prevMonth: true },
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9, events: [{ text: "한국어", color: "red" }] },
    { day: 10 },
    { day: 11 },
    { day: 12 },
    { day: 13, events: [{ text: "프로젝트", color: "green" }] },
    { day: 14 },
    { day: 15 },
    { day: 16 },
    {
      day: 17,
      events: [
        { text: "회의", color: "blue" },
        { text: "발표 준비", color: "yellow" },
      ],
    },
    { day: 18 },
    { day: 19 },
    { day: 20, events: [{ text: "시험", color: "red" }] },
    { day: 21 },
    { day: 22 },
    { day: 23 },
    { day: 24 },
    { day: 25 },
    { day: 26 },
    { day: 27 },
    { day: 28 },
    { day: 29 },
    { day: 30 },
    { day: 31 },
    { day: 1, nextMonth: true },
    { day: 2, nextMonth: true },
  ];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button className="nav-button prev"></button>
          <span className="month-year">2024년 10월</span>
          <button className="nav-button next"></button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-days-header">
          {shortDays.map((day, index) => (
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
              }`}>
              <span className="day-number">{dayData.day}</span>
              {dayData.events && (
                <div className="events">
                  {dayData.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`event event-${event.color}`}>
                      {event.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
