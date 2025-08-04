import BookmarkListStyles from "./BookmarkList.module.css";
import BookmarkTag from "../bookmark/img/tag.svg";
import BookmarkEdit from "../bookmark/img/edit.svg";
import BookmarkDelete from "../bookmark/img/delete.svg";
import BookmarkShow from "../bookmark/img/showMemo.svg";

const BookmarkList = () => {
  return (
    <div className={BookmarkListStyles.container}>
      <div className={BookmarkListStyles.wrapper}>
        <header>
          <h1 className={BookmarkListStyles.title}>내 북마크</h1>
          <input
            className={BookmarkListStyles.searchInput}
            placeholder="제목, 메모 내용, #태그명으로 검색"
          ></input>
          <br></br>
          <div className={BookmarkListStyles.tagBox}>
            <img
              src={BookmarkTag}
              alt="북마크 태그"
              className={BookmarkListStyles.tagImg}
            />
            <span className={BookmarkListStyles.tag}> 태그: </span>{" "}
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
          <div className={BookmarkListStyles.bookmarkListCard}>
            <div className={BookmarkListStyles.listContent}>
              <div className={BookmarkListStyles.date}>25/08/03</div>
              <img
                src={BookmarkDelete}
                alt="메모 삭제"
                className={BookmarkListStyles.deleteImg}
              />
              <div>
                <span className={BookmarkListStyles.memoTitle}>
                  React - useState란?
                </span>
                <img
                  src={BookmarkShow}
                  alt="메모 보기"
                  className={BookmarkListStyles.showImg}
                />
              </div>
              <div className={BookmarkListStyles.linkWrapper}>
                <a
                  href="https://react.dev/reference/react/useState"
                  target="_blank"
                >
                  https://react.dev/reference/react/useState
                </a>
              </div>
              <div className={BookmarkListStyles.memoContent}>
                useState 에 대한 추가 공부 예정
                <img
                  src={BookmarkEdit}
                  alt="메모 수정"
                  className={BookmarkListStyles.editImg}
                />
              </div>
              <div>
                <span className={BookmarkListStyles.memoTag}>#React</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookmarkList;
