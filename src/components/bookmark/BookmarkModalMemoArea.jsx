import { lazy, Suspense } from "react";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = lazy(() => import("react-quill-new"));
import "react-quill-new/dist/quill.snow.css";

const isBrowser = typeof window !== "undefined";

/**
 * 메모 작성 영역 컴포넌트 - 리치 텍스트 에디터
 * 원본 북마크 앱의 리치 텍스트 에디터와 완전히 동일한 기능과 디자인
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {string} value - 메모 내용 (HTML 형식)
 * @param {function} onChange - 내용 변경 시 호출되는 함수
 * @param {boolean} readOnly - 읽기 전용 모드 여부
 * @param {string} className - 추가 CSS 클래스
 */
const MemoWritingArea = ({
  value = "",
  onChange,
  readOnly = false,
  className = "",
}) => {
  // Quill 에디터 모듈 설정 - 간소화된 툴바
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [{ color: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
  };

  // 지원하는 포맷 - 간소화
  const formats = [
    "bold",
    "italic", 
    "underline",
    "color",
    "list",
    "link",
    "image",
  ];

  return (
    <div className={`memo-writing-area ${className}`}>
      {/* 헤더 */}
      <div className="memo-writing-area__header">
        <span className="memo-writing-area__label">Memo</span>
      </div>

      {/* 리치 텍스트 에디터 컨테이너 */}
      <div className="memo-writing-area__container">
        <Suspense
          fallback={
            <div className="memo-writing-area__loading">Loading editor...</div>
          }
        >
          {isBrowser && (
            <ReactQuill
              theme="snow"
              value={value}
              onChange={onChange}
              modules={modules}
              formats={formats}
              readOnly={readOnly}
              style={{
                minHeight: "300px",
                backgroundColor: readOnly ? "#f8f9fa" : "#ffffff",
              }}
              className={`custom-quill-editor ${
                readOnly ? "read-only-editor" : ""
              } ${
                readOnly
                  ? "memo-writing-area--read-only"
                  : "memo-writing-area--editable"
              }`}
            />
          )}
        </Suspense>
      </div>

    </div>
  );
};

export default MemoWritingArea;
