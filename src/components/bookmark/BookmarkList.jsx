import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookmarkListStyles from "./BookmarkList.module.css";
import "./BookmarkModal.css";
import "./BookmarkModalMemo.css";
import "./BookmarkModalMemoArea.css";
import BookmarkToggleNew from "../bookmark/img/toggleNew.svg";
import BookmarkTag from "../bookmark/img/tag.svg";
import BookmarkEdit from "../bookmark/img/edit.svg";
import BookmarkDelete from "../bookmark/img/delete.svg";
import BookmarkShow from "../bookmark/img/showMemo.svg";
import BookmarkSearchCondition from "../bookmark/img/searchCondition.svg";
import { useModal } from "./BookmarkModal";
import MemoModalEnhanced from "./BookmarkModalMemo";
import AddBookmark from "./AddBookmark";

const initialBookmarks = [
  {
    id: 1,
    date: "25/08/03",
    title: "React - useState란?",
    link: "https://react.dev/reference/react/useState",
    memo: "useState 에 대한 추가 공부 예정",
    tag: "React",
  },
  {
    id: 2,
    date: "25/08/03",
    title: "HTML 이란?",
    link: "https://developer.mozilla.org/ko/docs/Web/HTML",
    memo: 'HTML: Hypertext Markup Language, "Hypertext(하이퍼텍스트)"란 웹 페이지를 다른 페이지로 연결하는 링크"',
    tag: "HTML",
  },
];

const BookmarkList = ({ onToggleAddBookmark, isAddBookmarkOpen = false }) => {
  const memoModal = useModal();
  const [bookmarks, setBookmarks] = useState(
    initialBookmarks.map((b) => ({
      ...b,
      content: b.memo,
      urls: [b.link],
      tags: b.tag ? [b.tag] : [], // 기존 tag를 tags 배열로 변환
    }))
  );
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [isTogglePressed, setIsTogglePressed] = useState(false);

  // 선택 모드 관련 상태 추가
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  // AddBookmark 모달 상태 추가
  const [showAdd, setShowAdd] = useState(false);

  // 전역 태그 세트 상태 추가
  const [tagSet, setTagSet] = useState(
    () => new Set(initialBookmarks.flatMap((b) => (b.tag ? [b.tag] : [])))
  );

  // 초안 상태 추가
  const [addDraft, setAddDraft] = useState({
    title: "",
    tagsInput: "",
    url: "",
    memo: "",
  });

  // 파생 상태
  const allSelected =
    bookmarks.length > 0 && selectedIds.size === bookmarks.length;
  const hasSelection = selectedIds.size > 0;

  const handleCardClick = (bookmark) => {
    // 선택 모드일 때는 카드 클릭으로 모달을 열지 않음
    if (selectionMode) return;

    setSelectedBookmark(bookmark);
    memoModal.openModal();
  };

  const handleSaveBookmark = (updatedBookmark) => {
    setBookmarks((currentBookmarks) =>
      currentBookmarks.map((b) => {
        if (b.id === updatedBookmark.id) {
          return {
            ...b,
            ...updatedBookmark,
            link: updatedBookmark.urls[0] || "",
          };
        }
        return b;
      })
    );
    memoModal.closeModal();
  };

  const handleToggleClick = () => {
    setIsTogglePressed(true);
    // 토글 버튼 클릭 시 AddBookmark 모달 열기
    setShowAdd(true);

    // 버튼 누름 효과를 위한 타이머
    setTimeout(() => {
      setIsTogglePressed(false);
    }, 150);
  };

  const handleToggleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleClick();
    }
  };

  // 선택 모드 관련 핸들러들
  const toggleSelectionMode = () => {
    setSelectionMode((prev) => {
      if (prev) {
        // 선택 모드 종료 시 선택 상태 초기화
        setSelectedIds(new Set());
      }
      return !prev;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(bookmarks.map((b) => b.id)));
    }
  };

  const toggleOne = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const deleteSelected = async () => {
    if (!hasSelection) return;

    if (!confirm(`선택된 ${selectedIds.size}개 북마크를 삭제할까요?`)) return;

    // 선택된 북마크들을 리스트에서 제거
    setBookmarks((prev) => prev.filter((item) => !selectedIds.has(item.id)));

    // 선택 상태 초기화
    setSelectedIds(new Set());
    setSelectionMode(false);
  };

  // 북마크 생성 핸들러
  const handleCreate = (newBookmark) => {
    // 중복 URL 체크
    if (bookmarks.some((b) => b.link === newBookmark.url)) {
      alert("이미 같은 URL의 북마크가 있습니다.");
      return;
    }

    // 북마크를 리스트 상단에 추가
    setBookmarks((prev) => [newBookmark, ...prev]);

    // 태그 세트에 새 태그들 병합
    setTagSet((prev) => {
      const next = new Set(prev);
      (newBookmark.tags ?? []).forEach((t) => next.add(t));
      return next;
    });

    // 모달 닫기
    setShowAdd(false);

    // 저장 성공 시에만 초안 초기화
    setAddDraft({ title: "", tagsInput: "", url: "", memo: "" });
  };

  return (
    <div className={BookmarkListStyles.container}>
      <div className={BookmarkListStyles.wrapper}>
        <header>
          <h1 className={BookmarkListStyles.title}>내 북마크</h1>

          {/* 검색 영역 - relative로 설정하여 토글 버튼 배치 */}
          <div className={BookmarkListStyles.searchContainer}>
            <button
              type="button"
              onClick={handleToggleClick}
              onKeyDown={handleToggleKeyDown}
              className={`${BookmarkListStyles.toggleNew} ${
                isTogglePressed ? BookmarkListStyles.togglePressed : ""
              } ${isAddBookmarkOpen ? BookmarkListStyles.toggleActive : ""}`}
              aria-label="새 북마크 추가"
              title="새 북마크 추가"
            >
              <img src={BookmarkToggleNew} alt="" aria-hidden="true" />
            </button>
            <input
              className={BookmarkListStyles.searchInput}
              placeholder="제목, 메모 내용, #태그명으로 검색"
            />
          </div>

          <div className={BookmarkListStyles.searchConditionBox}>
            <img
              src={BookmarkSearchCondition}
              alt="검색 조건"
              className={BookmarkListStyles.searchCondition}
            />
            <span className={BookmarkListStyles.condtionTitle}>검색 조건</span>
          </div>
          <div className={BookmarkListStyles.tagBox}>
            <img
              src={BookmarkTag}
              alt="북마크 태그"
              className={BookmarkListStyles.tagImg}
            />
            {/* 태그는 검색된 것 - 남색 배경, 그렇지 않은 것 - 회색 배경 (이후 기능 때 추가 예정) */}
            <span className={BookmarkListStyles.tag}> 태그: </span>
            {Array.from(tagSet).map((tag) => (
              <span key={tag} className={BookmarkListStyles.tagRound}>
                {tag}
              </span>
            ))}
          </div>
          <div>
            <span className={BookmarkListStyles.searchResult}>
              총 {bookmarks.length}개의 북마크 | 검색: "추가 공부" (직접 입력),
              태그: #React
            </span>
          </div>

          {/* 선택 모드 툴바 - 조건부 렌더링 */}
          <div className={BookmarkListStyles.deleteBtn}>
            {!selectionMode ? (
              <div>
                <button
                  className={BookmarkListStyles.selectBtn}
                  onClick={toggleSelectionMode}
                  aria-pressed="false"
                  aria-label="북마크 선택 모드 시작"
                >
                  <span className={BookmarkListStyles.selectBtnText}>선택</span>
                </button>
              </div>
            ) : (
              <div className={BookmarkListStyles.selectionBar}>
                <button
                  className={BookmarkListStyles.selectBtn}
                  onClick={toggleSelectionMode}
                  aria-pressed="true"
                  aria-label="선택 모드 종료"
                >
                  <span className={BookmarkListStyles.selectBtnText}>취소</span>
                </button>
                <button
                  className={BookmarkListStyles.selectBtn}
                  onClick={toggleSelectAll}
                  aria-label={allSelected ? "전체 선택 해제" : "전체 선택"}
                >
                  <span className={BookmarkListStyles.selectBtnText}>
                    {allSelected ? "전체해제" : "전체선택"}
                  </span>
                </button>
                <button
                  className={`${BookmarkListStyles.selectBtn} ${
                    !hasSelection ? BookmarkListStyles.selectBtnDisabled : ""
                  }`}
                  onClick={deleteSelected}
                  disabled={!hasSelection}
                  aria-label="선택된 북마크 삭제"
                >
                  <span className={BookmarkListStyles.selectBtnText}>삭제</span>
                </button>
              </div>
            )}
          </div>
        </header>
        <main className={BookmarkListStyles.bookmarkCard}>
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className={`${BookmarkListStyles.bookmarkListCard} ${
                selectionMode
                  ? BookmarkListStyles.bookmarkListCardSelection
                  : ""
              }`}
              onClick={() => handleCardClick(bookmark)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCardClick(bookmark);
                }
              }}
            >
              {/* 선택 모드일 때만 체크박스 표시 */}
              {selectionMode && (
                <input
                  type="checkbox"
                  checked={selectedIds.has(bookmark.id)}
                  onChange={() => toggleOne(bookmark.id)}
                  aria-label={`${bookmark.title} 선택`}
                  className={BookmarkListStyles.checkbox}
                  onClick={(e) => e.stopPropagation()}
                />
              )}

              <div className={BookmarkListStyles.listContent}>
                <div className={BookmarkListStyles.date}>{bookmark.date}</div>
                <img
                  src={BookmarkDelete}
                  alt="메모 삭제"
                  className={BookmarkListStyles.deleteImg}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`${bookmark.title} 삭제`);
                  }}
                />
                <div className={BookmarkListStyles.titleWrapper}>
                  <span className={BookmarkListStyles.memoTitle}>
                    {bookmark.title}
                  </span>
                  <img
                    src={BookmarkShow}
                    alt="메모 보기"
                    className={BookmarkListStyles.showImg}
                  />
                </div>
                <div className={BookmarkListStyles.linkWrapper}>
                  <a
                    href={bookmark.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {bookmark.link}
                  </a>
                </div>
                <div className={BookmarkListStyles.memoContent}>
                  {bookmark.memo}
                  <img
                    src={BookmarkEdit}
                    alt="메모 수정"
                    className={BookmarkListStyles.editImg}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`${bookmark.title} 수정`);
                    }}
                  />
                </div>
                <div>
                  <span className={BookmarkListStyles.memoTag}>
                    #{bookmark.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </main>
        {/* 페이지네이션 */}
        <div className={BookmarkListStyles.pageNationBox}>
          <button
            variant="ghost"
            size="icon"
            className={BookmarkListStyles.pageRightContainer}
          >
            <ChevronLeft className={BookmarkListStyles.pageNation} />
          </button>
          <button
            variant="default"
            size="sm"
            className={BookmarkListStyles.pageNum}
          >
            1
          </button>
          <button
            variant="ghost"
            size="sm"
            className={BookmarkListStyles.pageNum}
          >
            2
          </button>
          <button
            variant="ghost"
            size="sm"
            className={BookmarkListStyles.pageNum}
          >
            3
          </button>
          <button
            variant="ghost"
            size="icon"
            className={BookmarkListStyles.pageRightContainer}
          >
            <ChevronRight className={BookmarkListStyles.pageNation} />
          </button>
        </div>
      </div>

      {/* AddBookmark 모달 */}
      {showAdd && (
        <AddBookmark
          draft={addDraft}
          onDraftChange={(patch) => setAddDraft((d) => ({ ...d, ...patch }))}
          onClose={() => setShowAdd(false)}
          onCreate={handleCreate}
        />
      )}

      {selectedBookmark && (
        <MemoModalEnhanced
          isOpen={memoModal.isOpen}
          onClose={memoModal.closeModal}
          bookmark={selectedBookmark}
          onSave={handleSaveBookmark}
        />
      )}
    </div>
  );
};

export default BookmarkList;
