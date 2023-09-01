import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === null || username.trim().length === 0) {
      return setError("Username is required");
    } else if (password === null || password.trim().length === 0) {
      return setError("Password is required");
    } else if (
      !isLogin &&
      (confirmPassword === null || confirmPassword.trim().length === 0)
    ) {
      return setError("Confirm password");
    } else if (!isLogin && password !== confirmPassword) {
      return setError("Invalid password confirmation");
    } else {
      setError(null);
      const endpoint = isLogin ? "login" : "signup";
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/auth/${endpoint}`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ username, password }),
          }
        );
        const res = await response.json();
        if (response.status === 200) {
          setCookie("User", res.user);
          setCookie("AuthToken", res.token);
        } else setError(res.message);
      } catch (error) {
        setError("Something wen wrong");
      }
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form method="POST">
          <h2 style={{ textAlign: "center" }}>
            {isLogin ? "Login to Todo App" : "Signup to Todo App"}
          </h2>
          {error && (
            <div
              style={{
                backgroundColor: "rgba(255,0, 0,0.2)",
                paddingInline: 20,
                paddingBlock: 5,
                borderRadius: 5,
              }}
            >
              {error}
            </div>
          )}
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input type="submit" className="create" onClick={handleSubmit} />
        </form>

        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? "rgb(255,255,255)"
                : "rgb(188,188,188)",
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin
                ? "rgb(255,255,255)"
                : "rgb(188,188,188)",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
