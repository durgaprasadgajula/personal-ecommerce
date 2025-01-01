import React, { useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";

import "./index.css";
import { auth, gprovider } from "../../firebase";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const renderRegistrationLink = () => (
    <Link to="/register" className="register-link">
      Don&apos;t have an account? Register
    </Link>
  );

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    navigate("/");
  };

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const url = `${process.env.REACT_APP_API_URL}/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok === true) {
        onSubmitSuccess(data.jwt_token);
      } else {
        onSubmitFailure(data.error_msg);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      onSubmitFailure("An error occurred. Please try again.");
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, gprovider);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
        }),
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/google-login`,
        requestOptions
      );
      const data = await response.json();
      // Here you can handle the response data as needed
      console.log(data);
      if (response.ok === true) {
        onSubmitSuccess(data.jwt_token);
      } else {
        onSubmitFailure(data.error_msg);
      }
      // Redirect or perform any other action after successful login
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // Handle error if needed
    }
  };

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="password-input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
    </>
  );

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username-input-field"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
    </>
  );

  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-form-container">
      <img
        src="https://res.cloudinary.com/dcy8ylflx/image/upload/v1712597163/Screenshot_2024-04-08_223200_szybqq.png"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="https://res.cloudinary.com/dcy8ylflx/image/upload/v1712592804/6505894_ad09hr.jpg"
        className="login-img"
        alt="website login"
      />
      <div className="form-container">
        <img
          src="https://res.cloudinary.com/dcy8ylflx/image/upload/v1712597163/Screenshot_2024-04-08_223200_szybqq.png"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <form style={{ width: "100%" }} onSubmit={submitForm}>
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>

          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>

        <div>
          <span className="or-text">or</span>
        </div>
        <button className="gsi-material-button" onClick={signInWithGoogle}>
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{ display: "block" }}
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span className="gsi-material-button-contents">
              Sign in with Google
            </span>
            <span style={{ display: "none" }}>Sign in with Google</span>
          </div>
        </button>
        <div>
          <span className="or-text">or</span>
        </div>
        <div>{renderRegistrationLink()}</div>
      </div>
    </div>
  );
}

export default LoginForm;
