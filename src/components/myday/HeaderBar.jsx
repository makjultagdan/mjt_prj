import { useState, useEffect } from "react";
import "./HeaderBar.css";

const HeaderBar = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30분 = 1800초

  // 시간 포맷팅 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // 타이머 시작/정지 토글
  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  // 타이머 실행
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      // 타이머 완료 시 알림
      alert("뽀모도로 완료!");
      setTimeLeft(30 * 60); // 리셋
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  return (
    <div className="header-bar">
      <h1 className="page-title">나의 하루</h1>
      <div className="header-right">
        <div className="pomodoro-timer">
          <button className="play-button" onClick={toggleTimer}>
            {isTimerRunning ? "⏸" : "▶"}
          </button>
          <span className="timer-display">{formatTime(timeLeft)}</span>
        </div>
        <div className="user-icons">
          <button className="user-icon">👤</button>
          <button
            className="settings-icon"
            onClick={() => {
              /* 설정 페이지로 이동 */
            }}>
            ⚙️
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
