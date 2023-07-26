import axios from "axios";
import { useEffect, useState } from "react";
import { errorToast, succesToast } from "../utls/toast/toast";

const useAuthApis = () => {
  const [user, setUser] = useState(null);
  const [tokenChanged, setTokenChanged] = useState(false);

  /* Sing up */
  const signUp = (email, password, packageId, setSignUpCondition, navigate) => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
        email,
        password,
        packageId,
      })
      .then((response) => {
        if (response.statusText === "Created") {
          succesToast(response.data.message);
          navigate("/login");
        }
      })
      .catch((error) => {
        errorToast("Something went wrong!");
      })
      .finally(() => {
        setSignUpCondition((prevState) => ({ ...prevState, isLoading: false }));
      });
  };

  /* Sign in */

  const signIn = (email, password, setSignInCondition, navigate) => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setTokenChanged(!tokenChanged);
          succesToast("Log in success.");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          errorToast("Invalid Login Informations!");
        } else {
          errorToast("Something went wrong!");
        }
      })
      .finally(() => {
        setSignInCondition((prevState) => ({ ...prevState, isLoading: false }));
        navigate("/");
      });
  };

  /* Forgot Password */

  const forgotPassword = (email, SetForgotPasswordCondition, setSendCode) => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/forgot-password`, {
        email,
      })
      .then((response) => {
        if (response.status === 200) {
          setSendCode(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          errorToast("User not found!");
        } else {
          errorToast("Something went wrong!");
        }
      })
      .finally(() => {
        SetForgotPasswordCondition((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      });
  };

  //Logout
  const logOut = (navigate) => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    succesToast("Logout success.");
  };

  //Reset password
  const resetPassword = (password, resetToken, setForgotPasswordCondition) => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/forgot-password`, {
        password,
        resetToken,
      })
      .then((response) => {
        if (response.status === 200) {
          succesToast("Password reset succesfull.");
        }
      })
      .catch((error) => {
        errorToast("Something went wrong!");
      })
      .finally(() => {
        setForgotPasswordCondition((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/retrive-user?token=${token}`
        )
        .then((response) => {
          if (response.data.email) {
            setUser(response.data);
          }
        });
    }
  }, [tokenChanged]);

  return {
    user,
    signUp,
    signIn,
    forgotPassword,
    logOut,
    resetPassword,
  };
};

export default useAuthApis;
