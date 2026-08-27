import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ForYou from "./pages/ForYou";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <main className="content">
          <Routes>
            <Route path="/" element={<ForYou />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <div className="right-space">
          <button className="floating-button">+</button>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;