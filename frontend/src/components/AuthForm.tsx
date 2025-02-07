import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import { signUp, signIn } from "../auth";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Navigation hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isSignUp) {
        await signUp(email, password);
        setMessage("Account created successfully!");
      } else {
        await signIn(email, password);
        setMessage("Logged in successfully!");
        setTimeout(() => navigate("/dashboard"), 1000); // Redirect after login
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <p onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: "pointer", marginTop: "10px" }}>
        {isSignUp ? "Already have an account? Sign In" : "New user? Sign Up"}
      </p>
      <p>{message}</p>
    </div>
  );
};

export default AuthForm;
