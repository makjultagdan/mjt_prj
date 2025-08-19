import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import "./MydayReview.css";

const MydayReviewEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reviewData, setReviewData] = useState({
    lectureTitle: "",
    keywords: "",
    understanding: 1,
    emotion: "😊",
    importantConcept: "",
    learnedContent: "",
    newConcepts: "",
    difficultParts: "",
    solution: "",
    troubleshooting: "",
    feelings: "",
  });

  const [selectedTags, setSelectedTags] = useState([]);

  const understandingLevels = [1, 2, 3, 4, 5];
  const emotions = ["😊", "😐", "😔", "🤔", "😤", "😎", "🥳", "😴"];

  const availableTags = [
    {
      key: "learnedContent",
      label: "오늘 배운 내용",
      placeholder: "오늘 배운 내용을 자세히 적어주세요",
    },
    {
      key: "newConcepts",
      label: "새롭게 알게된 개념",
      placeholder: "새롭게 알게된 개념을 설명해주세요",
    },
    {
      key: "difficultParts",
      label: "어려웠던 부분",
      placeholder: "어려웠던 부분을 구체적으로 적어주세요",
    },
    {
      key: "solution",
      label: "해결 방법",
      placeholder: "어려웠던 부분을 어떻게 해결했는지 적어주세요",
    },
    {
      key: "troubleshooting",
      label: "발생한 문제와 해결 과정을 적어주세요",
      placeholder: "발생한 문제와 해결 과정을 적어주세요",
    },
    {
      key: "feelings",
      label: "느낀점",
      placeholder: "오늘 학습을 통해 느낀 점을 적어주세요",
    },
  ];

  useEffect(() => {
    // 수정할 회고 데이터 불러오기
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const reviewToEdit = reviews.find((review) => review.id === parseInt(id));

    if (reviewToEdit) {
      setReviewData(reviewToEdit);
      setSelectedTags(reviewToEdit.tags || []);
    } else {
      // 리뷰를 찾을 수 없으면 홈으로 리다이렉트
      navigate("/");
    }
  }, [id, navigate]);

  const handleUnderstandingChange = (level) => {
    setReviewData((prev) => ({ ...prev, understanding: level }));
  };

  const handleEmotionChange = (emoji) => {
    setReviewData((prev) => ({ ...prev, emotion: emoji }));
  };

  const toggleTag = (tagKey) => {
    if (selectedTags.includes(tagKey)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tagKey));
      setReviewData((prev) => ({ ...prev, [tagKey]: "" }));
    } else {
      setSelectedTags((prev) => [...prev, tagKey]);
    }
  };

  const handleAdditionalFieldChange = (fieldKey, value) => {
    setReviewData((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const updateReview = () => {
    if (
      !reviewData.lectureTitle.trim() ||
      !reviewData.keywords.trim() ||
      !reviewData.importantConcept.trim()
    ) {
      alert("필수 항목을 모두 입력해주세요!");
      return;
    }

    const updatedReview = {
      ...reviewData,
      tags: selectedTags,
      date: reviewData.date, // 원본 날짜 유지
      id: parseInt(id),
    };

    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const updatedReviews = reviews.map((review) =>
      review.id === parseInt(id) ? updatedReview : review
    );

    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    alert("회고가 수정되었습니다!");
    navigate("/");
  };

  return (
    <div className="myday-review-container">
      <Sidebar />
      <div className="myday-review-content">
        <div className="review-header-bar">
          <h1 className="review-page-title">회고 수정하기</h1>
        </div>
        <div className="review-white-container">
          <div className="review-form-container">
            <div className="review-form-content">
              <div className="form-fields">
                {/* 필수 필드들 */}
                <div className="form-field required">
                  <div className="field-header">
                    <div className="pin-icon">📍</div>
                    <label>
                      수강한 강의 제목
                      {!reviewData.lectureTitle.trim() && (
                        <span className="required-asterisk">*</span>
                      )}
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="강의 제목을 입력하세요"
                    value={reviewData.lectureTitle}
                    onChange={(e) =>
                      setReviewData((prev) => ({
                        ...prev,
                        lectureTitle: e.target.value,
                      }))
                    }
                    className="lecture-title-input"
                  />
                </div>

                <div className="form-field required">
                  <div className="field-header">
                    <div className="pin-icon">📍</div>
                    <label>
                      핵심 키워드
                      {!reviewData.keywords.trim() && (
                        <span className="required-asterisk">*</span>
                      )}
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="핵심 키워드를 입력하세요"
                    value={reviewData.keywords}
                    onChange={(e) =>
                      setReviewData((prev) => ({
                        ...prev,
                        keywords: e.target.value,
                      }))
                    }
                    className="keywords-input"
                  />
                </div>

                <div className="form-field required">
                  <div className="field-header">
                    <div className="pin-icon">📍</div>
                    <label>
                      이해도/감정
                      <span className="required-asterisk">*</span>
                    </label>
                  </div>
                  <div className="understanding-emotion-section">
                    <div className="understanding-section">
                      <div className="understanding-dots">
                        {understandingLevels.map((level) => (
                          <div
                            key={level}
                            className={`understanding-dot ${
                              level <= reviewData.understanding ? "filled" : ""
                            }`}
                            onClick={() =>
                              handleUnderstandingChange(level)
                            }></div>
                        ))}
                      </div>
                    </div>
                    <div className="emotion-section">
                      <span>감정 선택 아이콘</span>
                      <div className="emotion-picker">
                        {emotions.map((emoji) => (
                          <button
                            key={emoji}
                            className={`emotion-option ${
                              reviewData.emotion === emoji ? "selected" : ""
                            }`}
                            onClick={() => handleEmotionChange(emoji)}>
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-field required">
                  <div className="field-header">
                    <div className="pin-icon">📍</div>
                    <label>
                      가장 중요한 개념
                      {!reviewData.importantConcept.trim() && (
                        <span className="required-asterisk">*</span>
                      )}
                    </label>
                  </div>
                  <textarea
                    placeholder="오늘 배운 가장 중요한 개념을 정리해주세요"
                    value={reviewData.importantConcept}
                    onChange={(e) =>
                      setReviewData((prev) => ({
                        ...prev,
                        importantConcept: e.target.value,
                      }))
                    }
                    className="concept-textarea"
                    rows="6"
                  />
                </div>

                {/* 선택적 추가 필드들 */}
                {selectedTags.map((tagKey) => {
                  const tagInfo = availableTags.find(
                    (tag) => tag.key === tagKey
                  );
                  if (!tagInfo) return null;

                  return (
                    <div key={tagKey} className="form-field additional">
                      <div className="field-header">
                        <label>{tagInfo.label}</label>
                        <button
                          type="button"
                          className="remove-field-btn"
                          onClick={() => toggleTag(tagKey)}
                          title="이 필드 제거">
                          ×
                        </button>
                      </div>
                      <textarea
                        placeholder={tagInfo.placeholder}
                        value={reviewData[tagKey]}
                        onChange={(e) =>
                          handleAdditionalFieldChange(tagKey, e.target.value)
                        }
                        className="additional-textarea"
                        rows="4"
                      />
                    </div>
                  );
                })}

                {/* 수정 버튼 */}
                <div className="review-actions">
                  <button
                    onClick={updateReview}
                    className="save-review-btn"
                    disabled={
                      !reviewData.lectureTitle.trim() ||
                      !reviewData.keywords.trim() ||
                      !reviewData.importantConcept.trim()
                    }>
                    회고 수정하기
                  </button>
                </div>
              </div>

              {/* 우측 태그 선택 영역 */}
              <div className="tags-sidebar">
                <button className="add-tag-btn">
                  <span>+</span>
                </button>
                {availableTags.map((tag) => (
                  <button
                    key={tag.key}
                    className={`tag-option ${
                      selectedTags.includes(tag.key) ? "selected" : ""
                    }`}
                    onClick={() => toggleTag(tag.key)}>
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MydayReviewEdit;
