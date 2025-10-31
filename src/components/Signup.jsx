import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="container mt-5 col-md-4">
      <h3 className="text-center mb-4">Signup</h3>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          className="form-control mb-3"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <button className="btn btn-success w-100">Sign Up</button>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
