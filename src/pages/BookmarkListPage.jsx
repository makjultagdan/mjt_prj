import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import BookmarkList from "../components/bookmark/BookmarkList.jsx";

const BookmarkListPage = () => {
  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false);

  const toggleAddBookmark = () => {
    setIsAddBookmarkOpen(!isAddBookmarkOpen);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ flex: "0 0 260px" }}>
        <Sidebar />
      </aside>
      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: "16px 20px",
          boxSizing: "border-box",
        }}
      >
        <BookmarkList
          onToggleAddBookmark={toggleAddBookmark}
          isAddBookmarkOpen={isAddBookmarkOpen}
        />
      </main>
    </div>
  );
};

export default BookmarkListPage;
