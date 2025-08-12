import { useState } from "react";
import { useModal } from "./BookmarkModal";
import Pagination from 'react-js-pagination';
import MemoModalEnhanced from "./BookmarkModalMemo";
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
    memo: 'HTML: Hypertext Markup Language, “Hypertext(하이퍼텍스트)"란 웹 페이지를 다른 페이지로 연결하는 링크”',
    tag: "HTML",
  },
  { id: 3, date: "25/08/04", title: "CSS-in-JS", link: "https://example.com/css-in-js", memo: "Styled-components vs Emotion", tag: "CSS" },
    { id: 4, date: "25/08/05", title: "JavaScript Promises", link: "https://example.com/promises", memo: "Promise chaining and error handling", tag: "JS" },
    { id: 5, date: "25/08/06", title: "TypeScript Basics", link: "https://example.com/typescript", memo: "Basic types and interfaces", tag: "TypeScript" },
    { id: 6, date: "25/08/07", title: "Node.js Event Loop", link: "https://example.com/node-event-loop", memo: "Understanding the event loop", tag: "NodeJS" },
    { id: 7, date: "25/08/08", title: "GraphQL vs REST", link: "https://example.com/graphql-rest", memo: "Comparison of API design paradigms", tag: "API" },
    { id: 8, date: "25/08/09", title: "Webpack Configuration", link: "https://example.com/webpack", memo: "Loaders and plugins", tag: "Build" },
    { id: 9, date: "25/08/10", title: "React Hooks - useEffect", link: "https://react.dev/reference/react/useEffect", memo: "Side effects in functional components", tag: "React" },
    { id: 10, date: "25/08/11", title: "CSS Flexbox Guide", link: "https://example.com/flexbox", memo: "A complete guide to Flexbox", tag: "CSS" },
    { id: 11, date: "25/08/12", title: "Async/Await in JS", link: "https://example.com/async-await", memo: "Simplifying asynchronous code", tag: "JS" },
];

const BookmarkList = ({ onToggleAddBookmark, isAddBookmarkOpen = false }) => {
  const [isEditing, setIsEditing] = useState(false);  // 수정 모드 여부
  const [editedItem, setEditedItem] = useState('');  // 수정된 항목
  console.log(isEditing);

  const handleEditClick = () => {
    setIsEditing(true);
    // setEditedItem(item);
  };

  const memoModal = useModal();
  const [bookmarks, setBookmarks] = useState(
    initialBookmarks.map((b) => ({
      ...b,
      content: b.memo,
      urls: [b.link],
    }))
  );
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [isTogglePressed, setIsTogglePressed] = useState(false);

  const handleCardClick = (bookmark) => {
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
    onToggleAddBookmark?.();
    
    // 버튼 누름 효과를 위한 타이머
    setTimeout(() => {
      setIsTogglePressed(false);
    }, 150);
  };

  const handleToggleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
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
  const currentBookmarks = bookmarks.slice(indexOfFirstBookmark, indexOfLastBookmark);

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
                isTogglePressed ? BookmarkListStyles.togglePressed : ''
              } ${
                isAddBookmarkOpen ? BookmarkListStyles.toggleActive : ''
              }`}
              aria-label={isAddBookmarkOpen ? "새 북마크 추가 패널 닫기" : "새 북마크 추가 패널 열기"}
              aria-expanded={isAddBookmarkOpen}
              title={isAddBookmarkOpen ? "새 북마크 추가 패널 닫기" : "새 북마크 추가 패널 열기"}
            >
              <img
                src={BookmarkToggleNew}
                alt=""
                aria-hidden="true"
              />
            </button>
            <input
              className={BookmarkListStyles.searchInput}
              placeholder="제목, 메모 내용, #태그명으로 검색"
            />
            <div className={BookmarkListStyles.searchConditionBox}>
              <img
                src={BookmarkSearchCondition}
                alt="검색 조건"
                className={BookmarkListStyles.searchCondition}
              />
              <span className={BookmarkListStyles.condtionTitle}>검색 조건</span>
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
            <span className={BookmarkListStyles.tagRound}>React</span>
            <span className={BookmarkListStyles.tagRound}>JS</span>
            <span className={BookmarkListStyles.tagRound}>TypeScript</span>
            <span className={BookmarkListStyles.tagRound}>코드잇</span>
          </div>
          <div>
            <span className={BookmarkListStyles.searchResult}>
              총 4개의 북마크 | 검색: "추가 공부" (직접 입력), 태그: #React
            </span>
          </div>
          <div className={BookmarkListStyles.deleteBtn}>
            <div>
              <button className={BookmarkListStyles.selectBtn}>
                <span className={BookmarkListStyles.selectBtnText}>선택</span>
              </button>
            </div>
            <div>
              <button className={BookmarkListStyles.selectBtn}>
                <span className={BookmarkListStyles.selectBtnText}>
                  전체선택
                </span>
              </button>
            </div>
            <div>
              <button className={BookmarkListStyles.selectBtn}>
                <span className={BookmarkListStyles.selectBtnText}>삭제</span>
              </button>
            </div>
          </div>
        </header>
        <main className={BookmarkListStyles.bookmarkCard}>
          {currentBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className={BookmarkListStyles.bookmarkListCard}
              onClick={() => handleCardClick(bookmark)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCardClick(bookmark);
                }
              }}
            >
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
                  {isEditing ? (
                    <input value={editedItem.memo} onChange={(e) =>
                    setEditedItem({ ...editedItem, memo: e.target.value })
                  }
                  /> 
                  ) : (
                    <span>{bookmark.memo}</span>
                  )}
                  <img
                    src={BookmarkEdit}
                    alt="메모 수정"
                    className={BookmarkListStyles.editImg}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick();
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
        <div className={BookmarkListStyles.pagiNationBox}>
          <Pagination
            activePage={page}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={bookmarks.length}
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
