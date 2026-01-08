import React, { useState } from "react";
import axios from "axios";

const Signup = ({ setUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) return alert("Fill all fields");
    if (password !== confirmPassword) return alert("Passwords do not match");

    try {
      await axios.post("http://localhost:5000/api/auth/signup", { username, password });
      alert("Signup successful");

      // Auto login
      const loginRes = await axios.post("http://localhost:5000/api/auth/login", { username, password });
      setUserId(loginRes.data.userId);

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
