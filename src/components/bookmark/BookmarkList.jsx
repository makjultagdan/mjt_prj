import { useState } from "react";
import { useModal } from "./BookmarkModal";
import Pagination from "react-js-pagination";
import MemoModalEnhanced from "./BookmarkModalMemo";
import AddBookmark from "./AddBookmark";
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
  {
    id: 3,
    date: "25/08/04",
    title: "CSS-in-JS",
    link: "https://example.com/css-in-js",
    memo: "Styled-components vs Emotion",
    tag: "CSS",
  },
  {
    id: 4,
    date: "25/08/05",
    title: "JavaScript Promises",
    link: "https://example.com/promises",
    memo: "Promise chaining and error handling",
    tag: "JS",
  },
  {
    id: 5,
    date: "25/08/06",
    title: "TypeScript Basics",
    link: "https://example.com/typescript",
    memo: "Basic types and interfaces",
    tag: "TypeScript",
  },
  {
    id: 6,
    date: "25/08/07",
    title: "Node.js Event Loop",
    link: "https://example.com/node-event-loop",
    memo: "Understanding the event loop",
    tag: "NodeJS",
  },
  {
    id: 7,
    date: "25/08/08",
    title: "GraphQL vs REST",
    link: "https://example.com/graphql-rest",
    memo: "Comparison of API design paradigms",
    tag: "API",
  },
  {
    id: 8,
    date: "25/08/09",
    title: "Webpack Configuration",
    link: "https://example.com/webpack",
    memo: "Loaders and plugins",
    tag: "Build",
  },
  {
    id: 9,
    date: "25/08/10",
    title: "React Hooks - useEffect",
    link: "https://react.dev/reference/react/useEffect",
    memo: "Side effects in functional components",
    tag: "React",
  },
  {
    id: 10,
    date: "25/08/11",
    title: "CSS Flexbox Guide",
    link: "https://example.com/flexbox",
    memo: "A complete guide to Flexbox",
    tag: "CSS",
  },
  {
    id: 11,
    date: "25/08/12",
    title: "Async/Await in JS",
    link: "https://example.com/async-await",
    memo: "Simplifying asynchronous code",
    tag: "JS",
  },
];

const BookmarkList = ({ onToggleAddBookmark, isAddBookmarkOpen = false }) => {
  // const [isEditing, setIsEditing] = useState(false);  // 수정 모드 여부
  const [editingBookmarkId, setEditingBookmarkId] = useState(null);
  const [saveMemo, setSaveMemo] = useState(""); // 임시 메모 저장
  // const [editedMemo, setEditedMemo] = useState('');  // 수정된 항목

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

  // 수정 모드 시작
  const handleEditClick = (bookmark, e) => {
    e.stopPropagation();
    setEditingBookmarkId(bookmark.id);
    setSaveMemo(bookmark.memo);
  };

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

  // 검색 상태 추가
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // 검색 함수
  const performSearch = (query, bookmarkList) => {
    if (!query.trim()) {
      return bookmarkList;
    }

    const searchTerm = query.toLowerCase().trim();
    
    return bookmarkList.filter((bookmark) => {
      // 제목에서 검색
      const titleMatch = bookmark.title.toLowerCase().includes(searchTerm);
      
      // 메모 내용에서 검색
      const memoMatch = bookmark.memo.toLowerCase().includes(searchTerm);
      
      // 태그에서 검색 (# 포함 및 미포함 검색 지원)
      const tagMatch = bookmark.tag.toLowerCase().includes(searchTerm) ||
                     bookmark.tag.toLowerCase().includes(searchTerm.replace('#', '')) ||
                     searchTerm.includes('#') && bookmark.tag.toLowerCase().includes(searchTerm.substring(1));
      
      return titleMatch || memoMatch || tagMatch;
    });
  };

  // 검색 쿼리 변경 핸들러
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // 실시간 검색 수행
    const results = performSearch(query, bookmarks);
    setSearchResults(results);
    
    // 검색 시 첫 페이지로 이동
    setPage(1);
  };

  // 검색 초기화 핸들러
  const handleSearchClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setPage(1);
  };

  // 검색 결과가 있을 때 사용할 북마크 목록
  const displayBookmarks = searchQuery.trim() ? searchResults : bookmarks;

  // 파생 상태
  const allSelected =
    displayBookmarks.length > 0 && selectedIds.size === displayBookmarks.length;
  const hasSelection = selectedIds.size > 0;

  const handleCardClick = (bookmark) => {
    // 선택 모드일 때는 카드 클릭으로 모달을 열지 않음
    if (selectionMode) return;
    if (editingBookmarkId !== bookmark.id) {
      setSelectedBookmark(bookmark);
      memoModal.openModal();
    }
    setSelectedBookmark(bookmark);
    memoModal.openModal();
  };
  // 수정 취소
  const handleCancelEdit = (e) => {
    e?.stopPropagation();
    setEditingBookmarkId(null);
    setSaveMemo("");
  };

  // 메모 저장
  const handleSaveMemo = (id, e) => {
    e.stopPropagation();

    setBookmarks((currentBookmarks) =>
      currentBookmarks.map((b) =>
        b.id === id ? { ...b, memo: saveMemo, content: saveMemo } : b
      )
    );
    // 수정 모드 종료
    setEditingBookmarkId(null);
    setSaveMemo("");
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

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleChangePageClick = (page) => {
    setPage(page);
  };

  const indexOfLastBookmark = page * itemsPerPage;
  const indexOfFirstBookmark = indexOfLastBookmark - itemsPerPage;
  const currentBookmarks = displayBookmarks.slice(
    indexOfFirstBookmark,
    indexOfLastBookmark
  );

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
      setSelectedIds(new Set(displayBookmarks.map((b) => b.id)));
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
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                className={BookmarkListStyles.searchInput}
                placeholder="제목, 메모 내용, #태그명으로 검색"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: '100%', paddingRight: searchQuery ? '40px' : '12px' }}
              />
              {searchQuery && (
                <button
                  onClick={handleSearchClear}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#999',
                    padding: '2px'
                  }}
                  aria-label="검색어 지우기"
                  title="검색어 지우기"
                >
                  ✕
                </button>
              )}
            </div>
            <div className={BookmarkListStyles.searchConditionBox}>
              <img
                src={BookmarkSearchCondition}
                alt="검색 조건"
                className={BookmarkListStyles.searchCondition}
              />
              <span className={BookmarkListStyles.condtionTitle}>
                검색 조건
              </span>
            </div>
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
              {searchQuery.trim() ? (
                <>
                  검색 결과: {displayBookmarks.length}개 (전체: {bookmarks.length}개) | 
                  검색어: "{searchQuery}"
                </>
              ) : (
                `총 ${bookmarks.length}개의 북마크`
              )}
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
          {currentBookmarks.length === 0 && searchQuery.trim() ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem', 
              color: '#666',
              fontSize: '1.1rem'
            }}>
              <p>검색 결과가 없습니다.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                다른 검색어를 입력하거나 {' '}
                <button 
                  onClick={handleSearchClear}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#007bff', 
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  전체 목록 보기
                </button>
              </p>
            </div>
          ) : currentBookmarks.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem', 
              color: '#666',
              fontSize: '1.1rem'
            }}>
              <p>북마크가 없습니다.</p>
            </div>
          ) : (
            currentBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              onClick={(event) => handleCardClick(bookmark, event)}
              className={`${BookmarkListStyles.bookmarkListCard} ${
                selectionMode
                  ? BookmarkListStyles.bookmarkListCardSelection
                  : ""
              }`}
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
                  {editingBookmarkId === bookmark.id ? (
                    // 수정 모드일 때
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        width: "100%",
                      }}
                    >
                      <input
                        value={saveMemo}
                        onChange={(e) => setSaveMemo(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          flex: 1,
                          padding: "4px 8px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                        autoFocus
                      />
                      <button
                        onClick={(e) => handleSaveMemo(bookmark.id, e)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        저장
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#6c757d",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    // 일반 모드일 때
                    <>
                      <span>{bookmark.memo}</span>
                      <img
                        src={BookmarkEdit}
                        alt="메모 수정"
                        className={BookmarkListStyles.editImg}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(bookmark, e);
                        }}
                      />
                    </>
                  )}
                </div>
                <div>
                  <span className={BookmarkListStyles.memoTag}>
                    #{bookmark.tag}
                  </span>
                </div>
              </div>
            </div>
            ))
          )}
        </main>
        {/* 페이지네이션 */}
        <div className={BookmarkListStyles.pagiNationBox}>
          <Pagination
            activePage={page}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={displayBookmarks.length}
            pageRangeDisplayed={5}
            onChange={handleChangePageClick}
            prevPageText={"<"}
            nextPageText={">"}
            firstPageText={"<<"}
            lastPageText={">>"}
            innerClass={BookmarkListStyles.pagination}
            itemClass={BookmarkListStyles.pageItem}
            linkClass={BookmarkListStyles.pageLink}
            activeClass={BookmarkListStyles.active}
            disabledClass={BookmarkListStyles.disabled}
          />
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
    </div>
  );
};

export default BookmarkList;
