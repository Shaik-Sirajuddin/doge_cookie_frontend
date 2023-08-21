import axios from "axios";
import { useEffect, useState } from "react";
import { errorToast, succesToast } from "../utls/toast/toast";

const useAuthApis = () => {
  const [user, setUser] = useState(null);
  const [tokenChanged, setTokenChanged] = useState(false);
  const [isRouterLoading, setRouteLoading] = useState(true);

  /* Sing up */
  const signUp = (email, password, packageId, setSignUpCondition, navigate) => {
    setRouteLoading(true);
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
        errorToast(error?.response?.data?.message);
      })
      .finally(() => {
        setSignUpCondition((prevState) => ({ ...prevState, isLoading: false }));
        setRouteLoading(false);
      });
  };

  const signIn = (email, password, setSignInCondition, navigate) => {
    setRouteLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("email", email);
          setTokenChanged(!tokenChanged);
          succesToast("Log in success.");
          if (email === "admin@gmail.com") {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
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
        setRouteLoading(false);
      });
  };

  /* Forgot Password */

  const forgotPassword = (email, SetForgotPasswordCondition, setSendCode) => {
    setRouteLoading(true);
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
        setRouteLoading(false);
      });
  };

  //Logout
  const logOut = (navigate) => {
    setRouteLoading(true);
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    succesToast("Logout success.");
    setRouteLoading(false);
  };

  //Reset password
  const resetPassword = (password, resetToken, setForgotPasswordCondition) => {
    setRouteLoading(true);
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
        setRouteLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      setRouteLoading(true);
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/users/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.email) {
            setUser(response.data);
            setRouteLoading(false);
          }
        })
        .catch((error) => {
          errorToast(error.message);
        })
        .finally(() => {
          setRouteLoading(false);
        });
    } else {
      setRouteLoading(false);
    }
  }, [tokenChanged]);

  return {
    user,
    signUp,
    signIn,
    forgotPassword,
    logOut,
    resetPassword,
    isRouterLoading,
  };
};

export default useAuthApis;
