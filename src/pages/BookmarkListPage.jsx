import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import AddBookmark from "../components/bookmark/AddBookmark";
import BookmarkList from "../components/bookmark/BookmarkList.jsx";

const BookmarkListPage = () => {
  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false);

  const toggleAddBookmark = () => {
    setIsAddBookmarkOpen(!isAddBookmarkOpen);
  };

  const closeAddBookmark = () => {
    setIsAddBookmarkOpen(false);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      {/* 좌측 고정 Sidebar */}
      <Sidebar />

      {/* 메인 콘텐츠 영역 - 중앙 정렬 */}
      <div
        style={{
          flex: 1,
          height: "100vh",
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <BookmarkList onToggleAddBookmark={toggleAddBookmark} />
      </div>

      {/* AddBookmark 모달 */}
      <AddBookmark isOpen={isAddBookmarkOpen} onClose={closeAddBookmark} />
    </div>
  );
};

export default BookmarkListPage;
