import "./HeaderBar.css";

const HeaderBar = () => {
  return (
    <div className="header-bar">
      <h1 className="page-title">나의 하루</h1>
      <div className="header-right">
        <div className="time-display">
          <div className="play-icon"></div>
          <span>24:30</span>
        </div>
        <div className="user-icons">
          <div className="user-icon"></div>
          <div className="settings-icon"></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
