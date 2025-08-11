import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/auth/login"; // Update if needed

const Login: React.FC<{ onAuth: (token: string, role: string) => void }> = ({
  onAuth,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await axios.post(API_URL, { email, password });
      onAuth(res.data.token, res.data.user.role);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErr(e?.response?.data?.error || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 500,
        alignItems: "left",
        margin: "1rem auto",
        padding: 16,
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <h2>Login</h2>
      <input
        type="email"
        autoFocus
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 12, padding: 8 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 12, padding: 8 }}
      />
      <button type="submit" style={{ width: "100%", padding: 8 }}>
        Sign In
      </button>
      <button
        type="button"
        style={{
          width: "50%",
          padding: 8,
        }}
      >Register</button>

      {err && <p style={{ color: "red", marginTop: 12 }}>{err}</p>}
    </form>
  );
};

export default Login;
