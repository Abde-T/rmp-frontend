import React, { useState } from "react";
import Nav from "../Nav";
import SideBar from "../SideBar";
import Input from "./Input";
import { Button } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants/actionTypes";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };
  const switchMode = () => {
    setForm(initialState);
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log("success", res);
    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => {
    alert("Google Sign In was unsuccessful. Try again later");
    console.log("failed", res);
  };

  return (
    <>
      <Nav />
      <SideBar />
      <div className="auth__container">
        <form className="auth__form" onSubmit={handleSubmit}>
          <div name="title">{isSignUp ? "Sign Up" : "Sign In"}</div>
          {isSignUp && (
            <>
              <div className="name__input">
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  className="auth_input"
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  className="auth_input"
                  half
                />
              </div>
            </>
          )}
          <Input
            className="auth_input-"
            name="email"
            label="Email Address"
            handleChange={handleChange}
            type="email"
          />
            <Input
              className="auth_input-"
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}

            />
            {isSignUp && (
              <Input
                className="auth_input-"
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              
              />
            )}

          <Button
            type="submit"
            className="auth_button"
            color="inherit"
            variant="containedInherit"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          {/* <GoogleLogin
            render={(renderProps) => (
              <button
                type="button"
                className="auth_button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="" /> Sign in with google
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          /> */}

          <Button
            onClick={switchMode}
            variant="containedInherit"
            color="inherit"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign Up"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Auth;
