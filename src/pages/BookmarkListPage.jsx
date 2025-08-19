import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import BookmarkList from "../components/bookmark/BookmarkList.jsx";

const BookmarkListPage = () => {
  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false);

  const toggleAddBookmark = () => {
    setIsAddBookmarkOpen(!isAddBookmarkOpen);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
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
        <BookmarkList
          onToggleAddBookmark={toggleAddBookmark}
          isAddBookmarkOpen={isAddBookmarkOpen}
        />
      </div>
    </div>
  );
};

export default BookmarkListPage;
