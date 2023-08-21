import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import InputControl from "../../components/InputControl";
import { useState } from "react";
import { errorToast } from "../../utls/toast/toast";
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
    value: "1",
    text: "$100*10 (5%)",
  },
  {
    value: "2",
    text: "$200*10 (5.5%)",
  },
  {
    value: "3",
    text: "$500$*10 (6%)",
  },
  {
    value: "4",
    text: "$1000*10 (6.5%)",
  },
  {
    value: "5",
    text: "$2,000*10(7%)",
  },
  {
    value: "6",
    text: "$5,000*10(8%)",
  },
  {
    value: "7",
    text: "$10,000*10 (10%)",
  },
  {
    value: "8",
    text: "$100*5(3.5%)",
  },
  {
    value: "9",
    text: "$200*5(4%)",
  },
  {
    value: "10",
    text: "$500*5(4.5%)",
  },
  {
    value: "11",
    text: "$1,000*5(5%)",
  },
  {
    value: "12",
    text: "$2,000*5(5.5%)",
  },
  {
    value: "13",
    text: "$5,000*10(6.5%)",
  },
  {
    value: "14",
    text: "$10,000*10(7.5%)",
  },
];
export default SignUp;
