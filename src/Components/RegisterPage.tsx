import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = id ? parseInt(id, 10) : undefined;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (userId !== undefined && users[userId]) {
      setUsername(users[userId].username);
      setPassword(users[userId].password);
      setConfirmPassword(users[userId].password);
      setEmail(users[userId].email);
      setMobile(users[userId].mobile);
      setGender(users[userId].gender);
    }
  }, [userId]);

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (!username || !password || !confirmPassword || !email || !mobile || !gender) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.(com|COM)$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format!");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError("Mobile number must be of 10 digits.");
      return;
    }

    const newUser = { username, password, email, mobile, gender };

    if (userId !== undefined) {
      users[userId] = newUser;
    } else {
      users.push(newUser);
    }

    localStorage.setItem("users", JSON.stringify(users));
    alert(userId !== undefined ? "User updated successfully!" : "User registered successfully!");
    navigate("/users");
  };

  return (
      <form>
        <h2><u>{userId !== undefined ? "Edit User" : "New User Registration"}</u></h2>
        {error && <p className="error-message">{error}</p>}

        <label >Username</label>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Password</label>
        <div className="password-container">
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? "👁️" : "🔒"}</span>
        </div>

        <label >Confirm Password</label>
        <div className="password-container">
          <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "👁️" : "🔒"}</span>
        </div>

        <label >Email</label>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label >Mobile Number</label>
        <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))} required />

        <label>Gender : {gender}</label>
        <div className="gender-container">
          <label><input type="radio" name="gender" value="Male" checked={gender === "Male"} onChange={() => setGender("Male")} /> Male</label>
          <label><input type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={() => setGender("Female")} /> Female</label>
        </div>

        <button type="button" onClick={handleRegister}>{userId !== undefined ? "Update" : "Submit"}</button>
        <button type="button" onClick={() => {userId !== undefined ? navigate("/users") : navigate("/")}}>Cancel</button>
      </form>
  );
};

export default RegisterPage;