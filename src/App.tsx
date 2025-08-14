import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import UserListPage from "./Components/UserListPage";
import DefaultPage from "./Components/DefaultPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/:id" element={<RegisterPage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="*" element={<DefaultPage />} />
      </Routes>
    </Router>
  );
};

export default App;