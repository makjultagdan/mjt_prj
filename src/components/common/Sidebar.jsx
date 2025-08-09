import { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isStudyOpen, setIsStudyOpen] = useState(false);

  const toggleStudy = () => {
    setIsStudyOpen((prev) => !prev);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon"></div>
          <span>LOGO</span>
        </div>
        <div className="search-bar">
          <div className="search-icon"></div>
          <input type="text" placeholder="검색" />
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-item active">
          <div className="nav-icon myday-icon"></div>
          <span>나의 하루</span>
        </div>

        <div className="nav-item" onClick={toggleStudy}>
          <div className="nav-icon study-icon"></div>
          <span>스터디</span>
          <div className={`nav-arrow ${isStudyOpen ? "open" : ""}`}></div>
        </div>

        <div className={`submenu-wrapper ${isStudyOpen ? "open" : ""}`}>
          <div className="nav-item sub">
            <div className="nav-icon note-icon"></div>
            <span>공부노트</span>
          </div>
          <div className="nav-item sub">
            <div className="nav-icon bookmark-icon"></div>
            <span>북마크</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
