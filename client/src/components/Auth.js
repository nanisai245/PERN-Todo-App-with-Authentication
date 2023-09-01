import React, { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        {error && <p>error</p>}
        <form>
          <h2>{isLogin ? "Login" : "Signup"}</h2>
          <input placeholder="Username" />
          <input type="password" placeholder="Password" />
          {isLogin && <input type="password" placeholder="Confirm Password" />}
          <input type="submit" className="create" />
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
