import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isStudyOpen, setIsStudyOpen] = useState(false);

  const toggleStudy = (e) => {
    e.preventDefault();
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
        <Link to="/" className="nav-item">
          <div className="nav-icon myday-icon"></div>
          <span>나의 하루</span>
        </Link>

        <div className="nav-item" onClick={toggleStudy}>
          <div className="nav-icon study-icon"></div>
          <span>스터디</span>
          <div className={`nav-arrow ${isStudyOpen ? "open" : ""}`}></div>
        </div>

        {isStudyOpen && (
          <div className="submenu-wrapper open">
            <NavLink to="/bookmarks/study-notes" className="nav-item sub">
              <div className="nav-icon note-icon"></div>
              <span>공부노트</span>
            </NavLink>
            <NavLink to="/bookmarks" className="nav-item sub">
              <div className="nav-icon bookmark-icon"></div>
              <span>북마크</span>
            </NavLink>
          </div>
        )}

        <Link to="/review" className="nav-item">
          <div className="nav-icon note-icon"></div>
          <span>회고록 작성</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
