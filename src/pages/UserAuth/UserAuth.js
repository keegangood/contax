import { React, useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { useCookies } from "react-cookie";
import "./scss/UserAuth.scss";
import UserAuthForm from "./UserAuthForm";
// import Loading from "../../layout/Loading";
// import { ReactComponent as Logo } from "../../../assets/img/Logo.svg";

import { login, register } from "../../state/AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { addAlert, removeAlert } from "../../state/AlertSlice";
import { requestAccessToken } from "../../state/AuthSlice";

const LoginExtra = (
  <div className="row g-0 auth-extra-content">
    <div className="col col-10 offset-1 text-center p-4 small auth-link-label">
      Don't have an account?{" "}
      <a href="/signup" className="link-warning text-decoration-none auth-link">
        Sign up
      </a>
    </div>
  </div>
);

const SignupExtra = (
  <div className="row g-0 auth-extra-content">
    <div className="col col-10 offset-1 text-center p-4 small auth-link-label">
      Already have an account?{" "}
      <a href="/login" className="link-warning text-decoration-none auth-link">
        Log in
      </a>
    </div>
  </div>
);

const UserAuth = ({ pageAction, pageTitle, history, ...props }) => {
  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies([]);

  const { accessToken } = useSelector((state) => state.auth);

  const callApi = async (formData) => {
    if (pageAction === "login") {
      const { email, password, password2 } = formData;

      await dispatch(login({ email, password, password2 }))
        .then(unwrapResult)
        // login success
        .then((res) => {
          // set alert
          let alert = { text: "Welcome!", alertType: "success" };
          dispatch(addAlert(alert));
          console.log('cookies', cookies)

          // redirect
          if (history) {
            let redirectPath = "app";
            if (history.location.state) {
              redirectPath = history.location.state.referer;
            }
            history.push(redirectPath);
          }
        })
        .catch((err) => {
          let alert;
          if (typeof err.message === "string") {
            dispatch(addAlert({ text: err.message, alertType: "danger" }));
          } else if (Array.isArray(err.message)) {
            err.message.map((message) => {
              dispatch(addAlert({ text: message, alertType: "danger" }));
            });
          }
        });
    } else if (pageAction === "signup") {
      await dispatch(register({ formData }))
        .then(unwrapResult)
        .then((res) => {
          dispatch(addAlert({ text: "Welcome!", alertType: "success" }));
        })
        .catch((err) => {
          let alert;
          if (typeof err.message === "string") {
            dispatch(addAlert({ text: err.message, alertType: "danger" }));
          } else if (Array.isArray(err.message)) {
            err.message.map((message) => {
              dispatch(addAlert({ text: message, alertType: "danger" }));
            });
          }
        });
    }
  };

  useEffect(() => {
    if (accessToken) {
      history.push("/app");
    }
  }, [accessToken]);

  return (
    <div
      className="
        container
        page-container 
        w-90
        flex flex-column 
        justify-content-center
        py-1
      "
      id="user-auth-page"
    >
      <div className="row g-0 mx-1 mt-5 pt-lg-5">
        <div className="col col-11 mx-auto offset-lg-1 col-md-10 col-lg-4">
          <div className="row g-0 shadow" id="user-auth-form-container">
            <div
              className="col col-md-10  offset-1"
              id="user-auth-header"
            ></div>
            <div className="row g-0 ">
              <div className="col col-10 offset-1 user-auth-action-title pt-3">
                <p className="px-2">{pageTitle}</p>
              </div>
            </div>
            <div className="row g-0  border-bottom border-3 border-info">
              <div className="col col-10 offset-1">
                <UserAuthForm
                  formAction={pageAction}
                  callApi={callApi} //{pageAction === "login" ? login : register}
                />
              </div>
            </div>

            {pageAction === "login" && LoginExtra}
            {pageAction === "signup" && SignupExtra}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accessToken: null, // logged in user's current access token
    isAuthenticated: false, // boolean indicating if a user is logged in
    user: null, // object with auth user data
  };
};

export default withRouter(connect(mapStateToProps)(UserAuth));
