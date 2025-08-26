import { useMemo, useState } from "react";
import styles from "./AddBookmark.module.css";

const AddBookmark = ({ onClose, onCreate, draft, onDraftChange }) => {
  // 에러 노출 제어
  const [touched, setTouched] = useState({
    title: false,
    url: false,
    memo: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const { title, tagsInput, url, memo } = draft;

  // 태그 파싱 함수
  const parseTags = (raw) => {
    const parts = raw
      .split(/[\s,]+/) // 공백/콤마 구분
      .map((t) => t.replace(/^#/, "")) // 앞의 # 제거
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    const uniq = Array.from(new Set(parts)).slice(0, 5);
    return uniq.filter((t) => t.length >= 1 && t.length <= 15);
  };

  // URL 정규화 함수
  const normalizeUrl = (u) => {
    if (!u) return "";
    if (/^https?:\/\//i.test(u)) return u;
    return `https://${u}`;
  };

  // 태그 미리보기
  const tags = useMemo(() => parseTags(tagsInput), [tagsInput]);

  const urlValue = normalizeUrl(url.trim());

  // 유효성 (boolean)
  const isTitleValid = (() => {
    const len = title.trim().length;
    return len >= 2 && len <= 60;
  })();
  const isUrlValid = !!urlValue && /^https?:\/\/[^\s]+$/i.test(urlValue);
  const isMemoValid = memo.length <= 60; // [ui improvement] 메모 제한을 60자로 변경

  // 에러 메시지 (노출은 touched/submitted에 따라)
  const titleErrMsg = "제목은 2~60자";
  const urlErrMsg = "유효한 URL을 입력";
  const memoErrMsg = "메모는 60자 이하"; // [ui improvement] 에러 메시지 수정

  const showTitleErr = (touched.title || submitted) && !isTitleValid;
  const showUrlErr = (touched.url || submitted) && !isUrlValid;
  const showMemoErr = (touched.memo || submitted) && !isMemoValid;

  // 저장 가능 여부
  const canSubmit = isTitleValid && isUrlValid && isMemoValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!canSubmit) return;

    const newBookmark = {
      id: crypto?.randomUUID?.() ?? String(Date.now()),
      title: title.trim(),
      tags,
      url: urlValue,
      memo: memo.trim() || undefined,
      createdAt: new Date().toISOString(),
      date: new Date()
        .toLocaleDateString("ko-KR", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\./g, "/"),
      link: urlValue,
      tag: tags.length > 0 ? tags[0] : "",
      content: memo.trim() || "",
      urls: [urlValue],
    };

    onCreate(newBookmark);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={styles.modalOverlay}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-label="새 북마크 추가"
      >
        {/* 모달 컨테이너 */}
        <form
          className={styles.modalContainer}
          onSubmit={handleSubmit}
          noValidate
        >
          {/* 닫기 버튼 */}
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleCloseClick}
            aria-label="모달 닫기"
          >
            ✕
          </button>

          <h2 className={styles.titleText}>🧷 새 북마크 추가</h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              제목<span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={`${styles.inputBox} ${
                showTitleErr ? styles.inputError : ""
              }`}
              value={title}
              onChange={(e) => onDraftChange({ title: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, title: true }))}
              placeholder="간단하고 직관적인 제목"
              aria-invalid={showTitleErr}
            />
            {showTitleErr && <p className={styles.error}>{titleErrMsg}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>태그</label>
            <input
              type="text"
              className={styles.inputBox}
              value={tagsInput}
              onChange={(e) => onDraftChange({ tagsInput: e.target.value })}
              placeholder="띄어쓰기/콤마로 구분 (예: react ts 자료구조)"
            />
            {!!tags.length && (
              <div className={styles.tagPreview}>
                {tags.map((t) => (
                  <span key={t} className={styles.chip}>
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              URL<span className={styles.required}>*</span>
            </label>
            <input
              type="url"
              className={`${styles.inputBox} ${
                showUrlErr ? styles.inputError : ""
              }`}
              value={url}
              onChange={(e) => onDraftChange({ url: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, url: true }))}
              placeholder="https://example.com/..."
              aria-invalid={showUrlErr}
            />
            {showUrlErr && <p className={styles.error}>{urlErrMsg}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>개인 메모</label>
            <textarea
              className={`${styles.textareaBox} ${
                showMemoErr ? styles.inputError : ""
              }`}
              value={memo}
              onChange={(e) => onDraftChange({ memo: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, memo: true }))}
              placeholder="메모를 입력하세요 (최대 60자)" // [ui improvement] placeholder 문구 변경
              maxLength={60} // [ui improvement] 최대 길이 제한
            />
            {showMemoErr && <p className={styles.error}>{memoErrMsg}</p>}
            <div className={styles.charCount}>{memo.length}/60</div>{" "}
            {/* [ui improvement] 글자 수 표시 수정 */}
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              className={`${styles.saveButton} ${
                canSubmit ? styles.active : ""
              }`}
              disabled={!canSubmit}
            >
              📁 저장
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBookmark;
