import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import InputControl from "../../components/InputControl";
import { useState } from "react";
import { errorToast } from "../../utls/toast/toast";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-hot-toast";

const SignIn = () => {
  const [signInInfo, setSignInInfo] = useState({
    email: "",
    password: "",
  });

  const [signInCondition, setSignInCondition] = useState({
    isLoading: false,
    isError: false,
  });

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegx.test(signInInfo.email)) {
      return errorToast("A valid email is requred!");
    }

    if (signInInfo.password.length === 0) {
      return errorToast("Please enter your password!");
    }

    setSignInCondition({
      ...signInCondition,
      isLoading: true,
    });

    signIn(signInInfo.email, signInInfo.password, setSignInCondition, navigate);

    toast.remove();
  };

  return (
    <AuthLayout title="Sign In">
      <div className="mb-20">
        <InputControl
          onChange={(e) =>
            setSignInInfo({ ...signInInfo, email: e.target.value })
          }
          label="Email Address"
          placeholder="Enter Email Address here"
        />
      </div>
      <div className="mb-20">
        <InputControl
          onChange={(e) =>
            setSignInInfo({ ...signInInfo, password: e.target.value })
          }
          type="password"
          label="Password"
          placeholder="Enter Password here"
        />
      </div>
      <div className="mb-20">
        <button
          onClick={handleSignIn}
          className="cmn-btn style-2"
          type="submit"
        >
          {signInCondition.isLoading ? "Loading..." : "Log In"}
        </button>
      </div>
      <br className="d-none d-sm-block" />
      <span>
        Don't have an Account?{" "}
        <Link to="/sign-up" className="text-base">
          Sign Up
        </Link>{" "}
      </span>
    </AuthLayout>
  );
};

export default SignIn;
