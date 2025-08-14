
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: { username: string; password: string }) =>
        u.username === username && u.password === password
    );

    if (user) {
      alert("Login successful");
      navigate("/users", { state: { message: "No registered users." } });
    } else {
      setError("Invalid username or password.");
      setUsername("");
      setPassword("");
    }
  };

  return (
      <form> 
        <h2><u>Login</u></h2>
        {error && <p className="error-message">{error}</p>}

        <label className="label">Username</label>
        <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label className="label">Password</label>
        <div className="password-container">
          <input type={showPassword ? "text" : "password"} placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <span onClick={() => setShowPassword(!showPassword)}> {showPassword ? "👁️" : "🔒"} </span>
        </div>

        <button type="button" onClick={handleLogin}>Login </button>
        <button type="button" onClick={() => navigate("/register")}>New User</button>
      </form>
  );
};

export default LoginPage;