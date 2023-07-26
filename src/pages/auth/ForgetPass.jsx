import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import InputControl from "../../components/InputControl";
import useAuth from "../../Hooks/useAuth";
import { errorToast } from "../../utls/toast/toast";
import { toast } from "react-hot-toast";

const ForgetPass = () => {
  const [sendCode, setSendCode] = useState(false);
  const [forgotPasswordInfo, setForgotPasswordInfo] = useState({
    email: "",
  });

  const [forgotPasswordCondition, setForgotPasswordCondition] = useState({
    isLoading: false,
    isError: false,
  });

  const { forgotPassword } = useAuth();

  const handleForgotPassword = () => {
    const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegx.test(forgotPasswordInfo.email)) {
      return errorToast("A valid email is requred!");
    }

    setForgotPasswordCondition({
      ...forgotPasswordCondition,
      isLoading: true,
    });

    forgotPassword(
      forgotPasswordInfo.email,
      setForgotPasswordCondition,
      setSendCode
    );

    toast.remove();
  };

  return (
    <AuthLayout title="Forget Password">
      {!sendCode ? (
        <>
          <div className="mb-20">
            <InputControl
              onChange={(e) =>
                setForgotPasswordInfo({
                  ...forgotPasswordInfo,
                  email: e.target.value,
                })
              }
              type="email"
              label="Email Address"
              placeholder="Enter Email Address here"
            />
          </div>
          <div className="mb-20">
            <button className="cmn-btn style-2" onClick={handleForgotPassword}>
              {forgotPasswordCondition.isLoading
                ? "Loading..."
                : "Forget Password"}
            </button>
          </div>
          <br className="d-none d-sm-block" />
          <span>
            Don't have an Account?{" "}
            <Link to="/login" className="text-base">
              Sign In
            </Link>{" "}
          </span>
        </>
      ) : (
        <>
          <div className="text-center">
            <div className="mb-3">
              Please check your inbox and click in the received link to reset a
              password.
            </div>
            <span>
              Didn't receive the link?{" "}
              <Link
                onClick={() => setSendCode(false)}
                to="#"
                style={{ color: "#DC3545" }}
              >
                Resend
              </Link>{" "}
            </span>
          </div>
        </>
      )}
    </AuthLayout>
  );
};

export default ForgetPass;
