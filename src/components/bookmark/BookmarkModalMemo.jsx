import { useState, useEffect } from "react";
import Modal from "./BookmarkModal";
import MemoWritingArea from "./BookmarkModalMemoArea";
import { Copy, ExternalLink, RotateCcw, Save, ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";
import modalTitle from "./img/modalTitle.svg";
import modalTag from "./img/modalTag.svg";
import modalUrl from "./img/modalUrl.svg";
import modalAddUrl from "./img/modalAddUrl.svg";
import chevronDown from "./img/Chevron_Down.svg";
import removeMinus from "./img/Remove_Minus.svg";
import closeSquare from "./img/Close_Square.svg";
import checkIcon from "./img/Check.svg";
import closeMd from "./img/Close_MD.svg";
/**
 * 향상된 메모 모달 컴포넌트
 * 원본 북마크 앱의 메모 모달과 동일한 기능과 디자인
 *
 * @param {Object} props - 모달 컴포넌트 속성
 * @param {boolean} isOpen - 모달 열림 상태
 * @param {function} onClose - 모달 닫기 함수
 * @param {Object} bookmark - 북마크 데이터
 * @param {function} onSave - 저장 함수
 */
const MemoModalEnhanced = ({ isOpen, onClose, bookmark = null, onSave }) => {
  // 상태 관리
  const [title, setTitle] = useState("");
  const [urls, setUrls] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTagInput, setNewTagInput] = useState("");
  const [memoContent, setMemoContent] = useState("");
  const [newUrlInput, setNewUrlInput] = useState("");
  const [showNewUrlInput, setShowNewUrlInput] = useState(false);
  const [isUrlDropdownOpen, setIsUrlDropdownOpen] = useState(false);

  // 원본 데이터 상태 (변경 여부 비교용)
  const [originalBookmark, setOriginalBookmark] = useState(null);

  // 북마크 데이터가 변경될 때 상태 업데이트
  useEffect(() => {
    if (bookmark) {
      const savedUrls = JSON.parse(localStorage.getItem(`bookmark_urls_${bookmark.id}`) || "[]");
      const savedTags = bookmark.tag ? bookmark.tag.split(',').filter(t => t.trim()) : [];
      const initialData = {
        id: bookmark.id,
        title: bookmark.title || "",
        urls: savedUrls.length > 0 ? savedUrls : (bookmark.urls || []),
        tags: savedTags,
        content: bookmark.content || "",
      };
      setTitle(initialData.title);
      setUrls(initialData.urls);
      setTags(initialData.tags);
      setMemoContent(initialData.content);
      setOriginalBookmark(initialData);
    }
  }, [bookmark]);

  // URLs를 로컬 스토리지에 저장
  useEffect(() => {
    if (bookmark && bookmark.id) {
      localStorage.setItem(`bookmark_urls_${bookmark.id}`, JSON.stringify(urls));
    }
  }, [urls, bookmark]);

  // 배열 깊은 비교 함수
  const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    return a.every((item, index) => item === b[index]);
  };

  // 변경사항 여부 확인
  const hasChanges =
    originalBookmark &&
    (originalBookmark.title !== title ||
      !arraysEqual(originalBookmark.tags, tags) ||
      originalBookmark.content !== memoContent ||
      !arraysEqual(originalBookmark.urls, urls));

  // 저장 처리
  const handleSave = () => {
    if (onSave) {
      const updatedBookmark = {
        ...bookmark,
        title,
        urls,
        tag: tags.join(','),
        content: memoContent,
      };
      onSave(updatedBookmark);
      
      // 저장 후 원본 데이터 업데이트로 변경사항 상태 리셋
      const newOriginalData = {
        id: bookmark.id,
        title: title,
        urls: [...urls],
        tags: [...tags],
        content: memoContent,
      };
      setOriginalBookmark(newOriginalData);
    }
  };

  // 변경사항 되돌리기
  const handleReset = () => {
    if (originalBookmark) {
      setTitle(originalBookmark.title);
      setUrls(originalBookmark.urls);
      setTags(originalBookmark.tags);
      setMemoContent(originalBookmark.content);
    }
  };

  // 모달 닫기 처리
  const handleClose = () => {
    if (
      hasChanges &&
      !window.confirm("변경사항이 저장되지 않았습니다. 정말로 닫으시겠습니까?")
    ) {
      return;
    }
    onClose();
  };

  // URL 복사
  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("URL이 복사되었습니다.");
    });
  };

  // URL 새 탭에서 열기
  const handleOpenUrl = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // URL 추가 UI 토글
  const handleToggleAddUrl = () => {
    setShowNewUrlInput(!showNewUrlInput);
    if (!showNewUrlInput) {
      setNewUrlInput("");
    }
  };

  // 새 URL 저장
  const handleSaveNewUrl = () => {
    if (newUrlInput.trim()) {
      let url = newUrlInput.trim();
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      setUrls([...urls, url]);
      setNewUrlInput("");
      setShowNewUrlInput(false);
    }
  };

  // 새 URL 입력 취소
  const handleCancelNewUrl = () => {
    setNewUrlInput("");
    setShowNewUrlInput(false);
  };

  // URL 드롭다운 토글
  const handleToggleUrlDropdown = () => {
    setIsUrlDropdownOpen(!isUrlDropdownOpen);
  };

  // URL 삭제
  const handleRemoveUrl = (indexToRemove) => {
    setUrls(urls.filter((_, index) => index !== indexToRemove));
  };

  // URL 수정
  const handleUrlChange = (indexToChange, newValue) => {
    setUrls(
      urls.map((url, index) => (index === indexToChange ? newValue : url))
    );
  };

  // 태그 추가
  const handleAddTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
      setNewTagInput("");
    }
  };

  // 태그 삭제
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Enter 키 처리
  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  if (!bookmark) return null;

  // 모달 푸터
  const footer = (
    <div className="memo-modal-enhanced__actions">
      <button
        className="react-modal__btn react-modal__btn--secondary"
        onClick={handleReset}
        disabled={!hasChanges}
        title="되돌리기"
      >
        <RotateCcw size={16} />
        <span>되돌리기</span>
      </button>
      <button
        className="react-modal__btn react-modal__btn--primary"
        onClick={handleSave}
        disabled={!hasChanges}
        title="저장"
      >
        <Save size={16} />
        <span>저장</span>
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title=""
      size="large"
      footer={footer}
      className="memo-modal-enhanced"
    >
      <div className="memo-modal-enhanced__content">
        {/* 제목 섹션 */}
        <div className="memo-modal-enhanced__section memo-modal-enhanced__section--row">
          <div className="memo-modal-enhanced__section-header">
            <img src={modalTitle} alt="modalTitle" />
            <span className="memo-modal-enhanced__section-label">제목</span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="memo-modal-enhanced__title-input"
            placeholder="제목을 입력하세요"
          />
        </div>

        {/* URL 섹션 */}
        <div className="memo-modal-enhanced__section">
          <div className="memo-modal-enhanced__section memo-modal-enhanced__section--row">
            <div className="memo-modal-enhanced__section-header">
              <img src={modalUrl} alt="modalUrl" />
              <span className="memo-modal-enhanced__section-label">URL</span>
            </div>
            <div className="memo-modal-enhanced__url-input-container">
              <input
                type="text"
                value={newUrlInput}
                onChange={(e) => setNewUrlInput(e.target.value)}
                className="memo-modal-enhanced__url-input-main"
                placeholder="URL을 입력하세요 (예: google.com 또는 https://example.com)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newUrlInput.trim()) {
                    handleSaveNewUrl();
                  }
                }}
              />
              <div className="memo-modal-enhanced__url-input-actions">
                <img 
                  src={modalAddUrl} 
                  alt="add url" 
                  className={`memo-modal-enhanced__url-icon add-icon ${!newUrlInput.trim() ? 'disabled' : ''}`}
                  onClick={newUrlInput.trim() ? handleSaveNewUrl : undefined}
                />
                {urls.length > 0 && (
                  <img 
                    src={chevronDown} 
                    alt="dropdown toggle" 
                    className={`memo-modal-enhanced__url-icon dropdown-icon ${isUrlDropdownOpen ? 'active rotated' : ''}`}
                    onClick={handleToggleUrlDropdown}
                  />
                )}
              </div>
              {/* URL 드롭다운 - URL input-main 바로 아래에 위치 */}
              {isUrlDropdownOpen && urls.length > 0 && (
                <div className="memo-modal-enhanced__url-dropdown">
                  <div className="memo-modal-enhanced__url-dropdown-content">
                    <div className="memo-modal-enhanced__url-list-scrollable">
                      {urls.map((url, index) => (
                        <div key={index} className="memo-modal-enhanced__url-item-dropdown">
                          <button
                            type="button"
                            className="memo-modal-enhanced__url-link-dropdown"
                            onClick={() => handleOpenUrl(url)}
                            title={url}
                          >
                            {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                          </button>
                          <button
                            type="button"
                            className="memo-modal-enhanced__url-remove-dropdown"
                            onClick={() => handleRemoveUrl(index)}
                          >
                            <img src={removeMinus} alt="remove" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* URL 목록 표시 */}
        {urls.length > 0 && (
          <div className="memo-modal-enhanced__section">
            <div className="memo-modal-enhanced__url-list-container">
              {urls.slice(0, 4).map((url, index) => (
                <div key={index} className="memo-modal-enhanced__url-item-simple">
                  <button
                    type="button"
                    className="memo-modal-enhanced__url-link-simple"
                    onClick={() => handleOpenUrl(url)}
                    title={url}
                  >
                    {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 태그 섹션 */}
        <div className="memo-modal-enhanced__section memo-modal-enhanced__section--row">
          <div className="memo-modal-enhanced__section-header">
            <img src={modalTag} alt="modalTag" />
            <span className="memo-modal-enhanced__section-label">태그</span>
          </div>
          <div className="memo-modal-enhanced__tag-container">
            {tags.map((tag, index) => (
              <div 
                key={index} 
                className="memo-modal-enhanced__tag"
              >
                #{tag}
                <img
                  src={closeMd}
                  alt="delete tag"
                  className="memo-modal-enhanced__tag-delete"
                  onClick={() => handleRemoveTag(tag)}
                  title={`Remove tag: ${tag}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 메모 작성 영역 */}
        <MemoWritingArea value={memoContent} onChange={setMemoContent} />
      </div>
    </Modal>
  );
};

export default MemoModalEnhanced;
