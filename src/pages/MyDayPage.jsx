import Sidebar from "../components/common/Sidebar.jsx";
import HeaderBar from "../components/myday/HeaderBar.jsx";
import Calendar from "../components/myday/Calendar.jsx";
import TodayReview from "../components/myday/TodayReview.jsx";
import TodoList from "../components/myday/TodoList.jsx";
import "./MydayPage.css";

const MydayPage = () => {
  return (
    <div className="myday-page">
      <Sidebar />
      <div className="main-content">
        <HeaderBar />
        <div className="content-area">
          <div className="calendar-section">
            <Calendar />
            <TodayReview />
          </div>
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default MydayPage;
