import { useNavigate, Link } from "react-router-dom";
import React from "react";
import Styles from "../../styles/Styles";

// Components
import OAuthButton from "../../components/buttons/OAuthButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const SignIn = () => {
  document.title = "SymptoMatik: Sign In";

  // [ METHODS ]: User Authentication
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/home");
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  // [ METHODS ]: OAuth Authentication
  const handleFacebookSignIn = () => {
    alert("Logging in via Facebook...");
  };

  const handleGoogleSignIn = () => {
    alert("Logging in via Google...");
  };

  const handleResetPassword = () => {};

  return (
    <div className={Styles.mainDivStyle}>
      {/* LOGIN PANEL */}
      <div className={Styles.loginDivStyle}>
        {/* HEADER */}
        <div className="flex justify-center items-center">
          <img src="./symptomatik-logo.svg" className="w-16 mt-6 mb-4" />
        </div>

        <h2 className="text-4xl text-center inter-semibold text-[var(--trust-blue)]">
          Welcome Back
        </h2>
        <h2 className="text-md text-center">
          Please enter your login credentials
        </h2>

        {/* FORM INPUT */}
        <form action="/login-form" className={Styles.formStyle}>
        <label htmlFor="username-email" className={Styles.inputLabelStyle}>Username or Email</label>
          <input
            type="text"
            placeholder="Username or Email"
            className={Styles.inputStyle}
          />

          <label htmlFor="password" className={Styles.inputLabelStyle}>Password</label>
          <input
            type="password"
            placeholder="Password"
            className={Styles.inputStyle}
          />

          <Link to="ResetPassword" className={Styles.sublinkStyle}>
            Forgot password?
          </Link>
        </form>
        {/* BUTTON: SIGN IN */}
        <PrimaryButton
          text="Sign In"
          onClick={handleSignIn}
          width="full"
          fontSize="18px"
          height="40px"
          disabled={false}
        />

        {/* OR SEPARATOR */}
        <div className="flex items-center w-full my-4 text-[var-(--trust-blue)]">
          <hr className="flex-grow border-t border-slate-400" />
          <span className="mx-2 text-[var-(--trust-blue)] text-sm">or</span>
          <hr className="flex-grow border-t border-slate-400" />
        </div>

        {/* BUTTON: SIGN UP */}
        <OAuthButton
          src="/fb-icon.png"
          alt="Facebook Sign In"
          onClick={handleFacebookSignIn}
          label="Continue with Facebook"
        />
        <OAuthButton
          src="/google-icon.png"
          alt="Google Sign In"
          onClick={handleGoogleSignIn}
          label="Continue with Google"
        />

        {/* SIGN UP: SUBLINK*/}
        <div className={Styles.signUpLinkDivStyle}>
          <h4>Don't have an account?</h4>
          <Link to="sign-up" className={Styles.sublinkStyle}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
