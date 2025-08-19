import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TodayReview.css";

const TodayReview = ({ selectedDate }) => {
  const [latestReview, setLatestReview] = useState(null);

  useEffect(() => {
    // 선택된 날짜 확인 (없으면 오늘 날짜)
    const checkDate = selectedDate || new Date();
    const month = checkDate.getMonth() + 1;
    const day = checkDate.getDate();
    const checkDateStr = checkDate.toDateString(); // "Thu Aug 15 2024" 형태

    // 8월 15일인 경우 목업 데이터 보여주기
    if (month === 8 && day === 15) {
      const mockReview = {
        lectureTitle: "React Hooks 심화 학습",
        keywords: "useState, useEffect, 커스텀 훅",
        understanding: 4,
        emotion: "🤔",
        importantConcept:
          "useEffect의 의존성 배열이 빈 배열일 때와 아예 없을 때의 차이점을 배웠습니다. 빈 배열은 컴포넌트 마운트 시 한 번만 실행되고, 의존성 배열이 없으면 매 렌더링마다 실행됩니다.",
        tags: ["learnedContent", "difficultParts"],
        date: new Date().toISOString(),
        id: Date.now(),
      };
      setLatestReview(mockReview);
    } else {
      // 다른 날은 선택된 날짜에 해당하는 회고 찾기
      const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
      const selectedReview = reviews.find((review) => {
        const reviewDate = new Date(review.date);
        return reviewDate.toDateString() === checkDateStr;
      });

      if (selectedReview) {
        setLatestReview(selectedReview);
      } else {
        setLatestReview(null);
      }
    }
  }, [selectedDate]);

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];
    return `${month}월 ${day}일 (${weekday})`;
  };

  if (!latestReview) {
    return (
      <div className="review-container">
        <div className="review-header">
          <div className="review-header-left">
            <h3 className="review-title">📝 오늘의 회고</h3>
          </div>
        </div>

        <div className="review-empty-section">
          <div className="empty-icon">📝</div>
          <p>아직 작성된 회고가 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="review-container">
      <div className="review-header">
        <div className="review-header-left">
          <h3 className="review-title">📝 오늘의 회고</h3>
          <div className="review-tags">
            {latestReview.tags.map((tag, index) => (
              <span key={index} className="review-tag review-tag-react">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="review-header-right">
          <div className="review-difficulty">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`review-dot ${
                  level <= latestReview.understanding ? "review-dot-filled" : ""
                }`}></div>
            ))}
          </div>
          <div className="review-emoji">{latestReview.emotion}</div>
        </div>
      </div>

      <div className="review-preview-section">
        <div className="review-content-preview">
          <div className="review-content-item">
            <h4>📚 수강한 강의</h4>
            <p>{latestReview.lectureTitle}</p>
          </div>

          <div className="review-content-item">
            <h4>🔑 핵심 키워드</h4>
            <p>{latestReview.keywords}</p>
          </div>

          <div className="review-content-item">
            <h4>💡 가장 중요한 개념</h4>
            <p>{latestReview.importantConcept}</p>
          </div>
        </div>

        <div className="review-actions">
          {/* 8월 15일 목업 데이터인 경우 새 회고 작성으로, 아니면 수정으로 */}
          {(selectedDate || new Date()).getMonth() + 1 === 8 &&
          (selectedDate || new Date()).getDate() === 15 ? (
            <Link to="/review" className="edit-review-btn">
              ✏️ 회고 작성하기
            </Link>
          ) : (
            <Link
              to={`/review/edit/${latestReview.id}`}
              className="edit-review-btn">
              ✏️ 수정하기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodayReview;
