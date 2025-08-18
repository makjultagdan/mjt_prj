import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MydayPage from "./pages/MyDayPage";
import MydayReview from "./pages/MydayReview";
import MydayReviewEdit from "./pages/MydayReviewEdit";
import TodoListPage from "./components/myday/TodoList/TodoListPage";
import TodoListModal from "./components/myday/TodoList/TodoListModal";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MydayPage />} />
          <Route path="/review" element={<MydayReview />} />
          <Route path="/review/edit/:id" element={<MydayReviewEdit />} />
          <Route path="/todolist" element={<TodoListPage />} />
          <Route path="/todolist/edit" element={<TodoListModal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
