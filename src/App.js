import { Route, Routes, NavLink } from "react-router-dom";
import "./App.css";

import { Navbar } from "./components/Navbar";

import Users from "./components/pages/Users";
import Posts from "./components/pages/Posts";
import Albums from "./components/pages/Albums";
import UserProfile from "./components/pages/UserProfile";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/Users" element={<Users />} />
        <Route exact path="/user/:userId" element={<UserProfile />} />

        <Route path="/Posts" element={<Posts />} />
        <Route path="/Albums" element={<Albums />} />
      </Routes>
    </div>
  );
}

export default App;
