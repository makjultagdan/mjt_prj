import "./TodayReview.css";

const TodayReview = () => {
  return (
    <div className="today-review">
      <h3>오늘의 회고</h3>
      <div className="review-content">
        <p>오늘 가장 어려웠던 개념은 무엇이었나요?</p>
        <div className="review-input">
          <input type="text" placeholder="내일의 계획" />
        </div>
        <div className="review-input">
          <input type="text" placeholder="코드 복습 기록" />
        </div>
      </div>
      <div className="tags-section">
        <div className="tags">
          <span className="tag tag-react">#React</span>
          <span className="tag tag-file">#파일 기본 구조</span>
          <span className="tag tag-switch">#switch문</span>
        </div>
        <div className="mood-indicators">
          <div className="mood-dots">
            <div className="dot filled"></div>
            <div className="dot filled"></div>
            <div className="dot filled"></div>
            <div className="dot"></div>
          </div>
          <div className="emoji">😊</div>
        </div>
      </div>
    </div>
  );
};

export default TodayReview;
