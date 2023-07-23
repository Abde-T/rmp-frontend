import React, { useState } from "react";
import Nav from "../Nav";
import SideBar from "../SideBar";
import Input from "./Input";
import { Button } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants/actionTypes";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import FileBase from "react-file-base64";
import GitHubIcon from "@mui/icons-material/GitHub";
import AddLinkIcon from "@mui/icons-material/AddLink";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  linkedin: "",
  gitHub: "",
  website: "",
  selectedFile: "",
};
const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) =>{
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleFile = (base64) =>{
    setForm({ ...form, selectedFile: base64 })
  }

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
              <div className="user__details">
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
                <div className="image__upload">
                  <FileBase
                    type="file"
                    multiple={false}
                    name="selectedFile"
                    onDone={({ base64 }) =>
                    handleFile(base64)
                  }
                  />
                </div>
                <div className="singup__inputs">
                <div className="icon__box">
                    <LinkedInIcon />
                    <Input
                      label="LinkedIn"
                      name="linkedin"
                      className="auth_input_ "
                      handleChange={handleChange}

                    />
                  </div>
                  <div className="icon__box">
                    <GitHubIcon />
                    <Input
                      label="GitHub"
                      name="gitHub"
                      className="auth_input_"
                      handleChange={handleChange}

                    />
                  </div>
                  <div className="icon__box">
                    <AddLinkIcon />
                    <Input
                      label="Portfolio"
                      name="website"
                      className="auth_input_"
                      handleChange={handleChange}
                    />
                  </div>
                </div>
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
