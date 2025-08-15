import "./TodayReview.css";

const TodayReview = () => {
  return (
    <div className="review-container">
      <div className="review-header">
        <div className="review-header-left">
          <h3 className="review-title">📝 오늘의 회고</h3>
          <div className="review-tags">
            <span className="review-tag review-tag-react">#React</span>
            <span className="review-tag review-tag-file">#if문 기본 구조</span>
            <span className="review-tag review-tag-switch">#switch문</span>
          </div>
        </div>
        <div className="review-header-right">
          <div className="review-difficulty">
            <div className="review-dot review-dot-filled"></div>
            <div className="review-dot review-dot-filled"></div>
            <div className="review-dot review-dot-filled"></div>
            <div className="review-dot"></div>
            <div className="review-dot"></div>
          </div>
          <div className="review-emoji">😊</div>
        </div>
      </div>

      <div className="review-input-section">
        <div className="review-input-group">
          <label>오늘 가장 어려웠던 개념은 무엇이었나요?</label>
          <input
            type="text"
            placeholder="개념을 입력해주세요"
            className="review-input"
          />
        </div>

        <div className="review-input-group">
          <label>내일의 계획</label>
          <input
            type="text"
            placeholder="계획을 입력해주세요"
            className="review-input"
          />
        </div>

        <div className="review-input-group">
          <label>코드 복습 기록</label>
          <textarea
            placeholder="복습 내용을 기록해주세요"
            className="review-textarea"
            rows="3"
          />
        </div>
      </div>

      <button className="review-save-button">저장하기</button>
    </div>
  );
};

export default TodayReview;
