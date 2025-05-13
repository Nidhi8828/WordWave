import React, { useState } from "react";
import gifImage from "./IrM.gif"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const[error,setErrorMessage]=useState("");
    const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    try {
    // Send a POST request to the login endpoint
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Login successful
      const data = await response.json(); // Parse the response JSON
      console.log("Login Successful:", data);
      setSuccessMessage("Login successful!");
      setErrorMessage("");
      // Optionally save a token or user info
      localStorage.setItem("token", data.token); 
      console.log("token:",data.token);
       window.location.href = "/"; // Save JWT or session token
    } else {
      // Handle server errors
      const errorData = await response.json();
      console.error("Login Failed:", errorData.message);
      setErrorMessage(errorData.message || "Login failed. Please try again.");
      setSuccessMessage("");
    }
  } catch (error) {
    // Handle network or unexpected errors
    console.error("Error occurred during login:", error.message);
    setErrorMessage("An error occurred. Please try again.");
    setSuccessMessage("");
  }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f3f4f6",
      backgroundImage: `url(${gifImage})`,
      width: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontSize: "14px",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      backgroundColor: "#3b82f6",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
    },
    link: {
      display: "block",
      marginTop: "10px",
      textAlign: "center",
      fontSize: "14px",
      color: "#3b82f6",
      textDecoration: "none",
    },
  };

  return (
    <>
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Log In
          </button>
            <div>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        </form>
        <a href="/register" style={styles.link}>
          Don’t have an account? Register here
        </a>
      </div>
    </div>
    </>
  );

};

export default Login;
