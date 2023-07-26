import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import InputControl from "../../components/InputControl";
import { toast } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { errorToast } from "../../utls/toast/toast";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPass = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const [resetPasswordInfo, setResetPasswordInfo] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [resetPasswordCondition, setResetPasswordCondition] = useState({
    isLoading: false,
    isError: false,
  });

  const { resetPassword } = useAuth();

  const handleResetPassword = () => {
    if (
      resetPasswordInfo.confirmNewPassword !== resetPasswordInfo.newPassword
    ) {
      return errorToast("Password does not match!");
    }

    setResetPasswordCondition({
      ...resetPasswordCondition,
      isLoading: true,
    });

    resetPassword(
      resetPasswordInfo.newPassword,
      token,
      setResetPasswordCondition
    );

    toast.remove();
  };

  return (
    <AuthLayout title="Reset Password">
      <>
        <div className="mb-20">
          <InputControl
            onChange={(e) =>
              setResetPasswordInfo({
                ...resetPasswordInfo,
                newPassword: e.target.value,
              })
            }
            type="password"
            label="New Password"
            placeholder="Enter a New password"
          />
        </div>
        <div className="mb-20">
          <InputControl
            onChange={(e) =>
              setResetPasswordInfo({
                ...resetPasswordInfo,
                confirmNewPassword: e.target.value,
              })
            }
            type="password"
            label="Confirm New Password"
            placeholder="Enter New Password again"
          />
        </div>
        <div className="mb-20">
          <button onClick={handleResetPassword} className="cmn-btn style-2">
            Reset Password
          </button>
        </div>
      </>
    </AuthLayout>
  );
};

export default ResetPass;
