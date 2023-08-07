/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import InputControl from "../../components/InputControl";
import { useState } from "react";
import { errorToast, succesToast } from "../../utls/toast/toast";
import { toast } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const SignUp = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    packageId: 0,
  });

  const [signUpCondition, setSignUpCondition] = useState({
    isLoading: false,
    isError: false,
  });

  const navigate = useNavigate();

  //Importing signup function

  const { signUp } = useAuth();

  //Handling the form submit
  const handleSignUp = () => {
    const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegx.test(signUpInfo.email)) {
      return errorToast("A valid email is requred!");
    }

    if (signUpInfo.password.length === 0) {
      return errorToast("Password is required!");
    }

    if (
      (signUpInfo.packageId.toString().length === 0) |
      (signUpInfo.packageId === 0)
    ) {
      return errorToast("Please select your package ID.");
    }

    setSignUpCondition({
      ...signUpCondition,
      isLoading: true,
    });

    signUp(
      signUpInfo.email,
      signUpInfo.password,
      parseInt(signUpInfo.packageId),
      setSignUpCondition,
      navigate
    );

    toast.remove();
  };

  return (
    <AuthLayout title="Become a Member">
      <div className="mb-20">
        <InputControl
          onChange={(e) =>
            setSignUpInfo({ ...signUpInfo, email: e.target.value })
          }
          label="Email Address"
          placeholder="Enter Email Address here"
        />
      </div>
      <div className="mb-20">
        <InputControl
          type="password"
          onChange={(e) =>
            setSignUpInfo({ ...signUpInfo, password: e.target.value })
          }
          label="Password"
          placeholder="Enter Password here"
        />
      </div>
      <div className="mb-20">
        <InputControl
          onChange={(e) =>
            setSignUpInfo({ ...signUpInfo, packageId: e.target.value })
          }
          label="Package ID"
          select={select}
        />
      </div>
      <div className="mb-20">
        <button
          onClick={handleSignUp}
          className="cmn-btn style-2"
          type="submit"
        >
          {signUpCondition.isLoading ? "Loading..." : "Sign Up"}
        </button>
      </div>
      <br className="d-none d-sm-block" />
      <span>
        Already have an Account?{" "}
        <Link to="/login" className="text-base">
          Log In
        </Link>{" "}
      </span>
    </AuthLayout>
  );
};
const select = [
  {
    value: "",
    text: "Select a Package ID",
  },
  {
    value: "457841",
    text: "457841",
  },
  {
    value: "434443",
    text: "434443",
  },
  {
    value: "345678",
    text: "345678",
  },
];
export default SignUp;
