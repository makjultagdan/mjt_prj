import React, { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import "./MydayReview.css";

const MydayReview = () => {
  const [reviewData, setReviewData] = useState({
    lectureTitle: "",
    keywords: "",
    understanding: 1,
    emotion: "😊",
    importantConcept: "",
    // 추가 필드들
    learnedContent: "",
    newConcepts: "",
    difficultParts: "",
    solution: "",
    troubleshooting: "",
    feelings: "",
  });

  const [selectedTags, setSelectedTags] = useState([]);

  const understandingLevels = [1, 2, 3, 4, 5];
  const emotions = ["😊", "😐", "😔", "🤔", "😎", "🥳"];

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
      label: "트러블 슈팅",
      placeholder: "발생한 문제와 해결 과정을 적어주세요",
    },
    {
      key: "feelings",
      label: "느낀점",
      placeholder: "오늘 학습을 통해 느낀 점을 적어주세요",
    },
  ];

  // 이해도 변경
  const handleUnderstandingChange = (level) => {
    setReviewData((prev) => ({ ...prev, understanding: level }));
  };

  // 감정 선택
  const handleEmotionChange = (emoji) => {
    setReviewData((prev) => ({ ...prev, emotion: emoji }));
  };

  // 태그 토글 (추가 입력 필드 표시/숨김)
  const toggleTag = (tagKey) => {
    if (selectedTags.includes(tagKey)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tagKey));
      // 해당 필드 데이터 초기화
      setReviewData((prev) => ({ ...prev, [tagKey]: "" }));
    } else {
      setSelectedTags((prev) => [...prev, tagKey]);
    }
  };

  // 추가 필드 값 변경
  const handleAdditionalFieldChange = (fieldKey, value) => {
    setReviewData((prev) => ({ ...prev, [fieldKey]: value }));
  };

  // 회고 저장
  const saveReview = () => {
    if (
      !reviewData.lectureTitle.trim() ||
      !reviewData.keywords.trim() ||
      !reviewData.importantConcept.trim()
    ) {
      alert("필수 항목을 모두 입력해주세요!");
      return;
    }

    const reviewToSave = {
      ...reviewData,
      tags: selectedTags,
      date: new Date().toISOString(),
      id: Date.now(),
    };

    // 로컬 스토리지에 저장
    const existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    existingReviews.push(reviewToSave);
    localStorage.setItem("reviews", JSON.stringify(existingReviews));

    alert("회고가 저장되었습니다!");

    // 폼 초기화
    setReviewData({
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
    setSelectedTags([]);
  };

  return (
    <div className="myday-review-container">
      <Sidebar />
      <div className="myday-review-content">
        <div className="review-header-bar">
          <h1 className="review-page-title">데일리 회고</h1>
        </div>
        <div className="review-white-container">
          <div className="review-form-container">
            <div className="review-form-content">
              <div className="form-fields">
                {/* 필수 필드들 */}
                {/* 수강한 강의 제목 */}
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

                {/* 핵심 키워드 */}
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

                {/* 이해도/감정 */}
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

                {/* 가장 중요한 개념 */}
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
                    rows="10"
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
                        rows="8"
                      />
                    </div>
                  );
                })}

                {/* 저장 버튼 */}
                <div className="review-actions">
                  <button
                    onClick={saveReview}
                    className="save-review-btn"
                    disabled={
                      !reviewData.lectureTitle.trim() ||
                      !reviewData.keywords.trim() ||
                      !reviewData.importantConcept.trim()
                    }>
                    회고 저장하기
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

export default MydayReview;
