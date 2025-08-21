import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MydayPage from "./pages/MyDayPage";
import MydayReview from "./pages/MydayReview";
import MydayReviewEdit from "./pages/MydayReviewEdit";
import TodoListPage from "./components/myday/TodoList/TodoListPage";
import TodoListModal from "./components/myday/TodoList/TodoListModal";
import BoorkmarkListPage from "./pages/BookmarkListPage";
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
          <Route path="/bookmark" element={<BoorkmarkListPage />} />
          <Route path="/bookmarks" element={<BoorkmarkListPage />} />
          <Route path="/bookmarks/:category" element={<BoorkmarkListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
