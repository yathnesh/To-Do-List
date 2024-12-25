import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config"; // Import the auth from firebase-config

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Using the useNavigate hook for routing after login

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setErrorMessage(""); // Reset any previous error message

    try {
      // Attempt to sign in using email and password
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the dashboard (or another route) after successful login
      navigate("/dashboard");
    } catch (error) {
      // Set error message if login fails
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <a href="/signup" className="signup-link">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
