import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Composer from "./components/Composer";
import ForYou from "./pages/ForYou";
import Profile from "./pages/Profile";

import postData from "./data/post.json";

function App() {
  const [posts, setPosts] = useState(postData.post);
  const [showNewThread, setShowNewThread] = useState(false);

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setShowNewThread(false);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar
          onNewThread={() => setShowNewThread(true)}
        />

        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                <ForYou
                  posts={posts}
                  onPost={handleNewPost}
                />
              }
            />

            <Route path="/profile" element={<Profile />} />

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </main>

        <div className="right-space">
          <button className="floating-button">+</button>
        </div>

        {/* NEW THREAD MODAL */}
        {showNewThread && (
          <div
            className="new-thread-overlay"
            onClick={() => setShowNewThread(false)}
          >
            <div
              className="new-thread-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="new-thread-header">
                <button
                  className="new-thread-cancel"
                  onClick={() => setShowNewThread(false)}
                >
                  Cancel
                </button>

                <strong>New thread</strong>

                <div className="new-thread-header-icons">
                  <span>▧</span>
                  <span>•••</span>
                </div>
              </div>

              <Composer onPost={handleNewPost} />
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;