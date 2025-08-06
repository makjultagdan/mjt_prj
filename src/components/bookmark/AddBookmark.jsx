import { useState } from "react";
import styles from "./AddBookmark.module.css";

const AddBookmark = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [url, setUrl] = useState("");
  const [memo, setMemo] = useState("");

  const isSaveDisabled = !title.trim();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div className={styles.modalOverlay} onClick={handleOverlayClick}>
        {/* 모달 컨테이너 */}
        <div className={styles.modalContainer}>
          {/* 닫기 버튼 */}
          <button
            className={styles.closeButton}
            onClick={handleCloseClick}
            aria-label="모달 닫기"
          >
            ✕
          </button>

          <h2 className={styles.titleText}>📎 새 북마크 추가</h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              제목<span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={styles.inputBox}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="북마크 제목을 입력하세요"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>태그</label>
            <input
              type="text"
              className={styles.inputBox}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="쉼표를 통해 구분해주세요."
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>URL</label>
            <input
              type="url"
              className={styles.inputBox}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.mjtagdan.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>개인 메모</label>
            <textarea
              className={styles.textareaBox}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="간단한 메모를 작성합니다. (최대 50자)"
              maxLength={50}
            />
          </div>

          <button
            className={`${styles.saveButton} ${
              !isSaveDisabled ? styles.active : ""
            }`}
            disabled={isSaveDisabled}
          >
            📁 저장
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBookmark;
