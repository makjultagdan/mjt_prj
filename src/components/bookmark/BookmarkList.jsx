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
];

const BookmarkList = () => {
  const memoModal = useModal();
  const [bookmarks, setBookmarks] = useState(
    initialBookmarks.map((b) => ({
      ...b,
      content: b.memo,
      urls: [b.link],
    }))
  );
  const [selectedBookmark, setSelectedBookmark] = useState(null);

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

  return (
    <div className={BookmarkListStyles.container}>
      <div className={BookmarkListStyles.wrapper}>
        <header>
          <h1 className={BookmarkListStyles.title}>내 북마크</h1>
          <img
            src={BookmarkToggleNew}
            alt="새 북마크 추가"
            className={BookmarkListStyles.toggleNew}
          />
          <input
            className={BookmarkListStyles.searchInput}
            placeholder="제목, 메모 내용, #태그명으로 검색"
          ></input>
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
          {bookmarks.map((bookmark) => (
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
