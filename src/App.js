import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector, connect } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { logout } from "./state/AuthSlice";

import "./App.scss";

import { Container, Spinner } from "reactstrap";

import NavDesktop from "./components/NavDesktop";
import NavMobile from "./components/NavMobile";

import Homepage from "./pages/Homepage/Homepage";
import UserAuth from "./pages/UserAuth/UserAuth";
import Contacts from "./pages/Contacts/Contacts";
import ContactDetail from "./pages/Contacts/ContactDetail";
import About from "./pages/About/About";
import Alerts from "./components/Alerts/Alerts";

import PrivateRoute from "./components/PrivateRoute";

import { requestAccessToken } from "./state/AuthSlice";
import { getContacts, orderBy } from "./state/ContactSlice";
function App({ history }) {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  let { isAuthenticated, authLoadingStatus, user, accessToken } = useSelector(
    (state) => state.auth
  );
  const { contactLoadingStatus, contacts } = useSelector(
    (state) => state.contacts
  );

  const { alerts } = useSelector((state) => state.alerts);

  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(requestAccessToken())
        .then(unwrapResult)
        .catch((err) => {
          // console.log(history);
          // history.push("/login");
        });
    })();
  }, [dispatch, requestAccessToken, history]);

  useEffect(() => {
    dispatch(getContacts({ accessToken, orderBy }));
  }, [accessToken]);

  const onLogout = () => {
    dispatch(logout())
      .then(unwrapResult)
      .then((res) => {
        history.push("/app");
      })
      .catch((err) => console.log("Error", err));
  };

  return (
    <Container fluid className="app g-0">
      {authLoadingStatus === "PENDING" || contactLoadingStatus === "PENDING" ? (
        <div
          className="
            spinner
            d-flex
            align-items-center
            justify-content-center
          "
        >
          <Spinner color="info" className="spinner-border">
            {" "}
          </Spinner>
        </div>
      ) : (
        <div className="mt-5">
          {alerts.length > 0 && <Alerts alerts={alerts} />}
          <span className="d-none d-lg-block">
            <NavDesktop
              user={user}
              onLogout={onLogout}
              isAuthenticated={isAuthenticated}
            />
          </span>
          <span className="d-block d-lg-none">
            <NavMobile
              user={user}
              isAuthenticated={isAuthenticated}
              onLogout={onLogout}
              navOpen={navOpen}
              setNavOpen={setNavOpen}
            />
          </span>
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => (
                <Homepage
                  isAuthenticated={isAuthenticated}
                  authLoadingStatus={authLoadingStatus}
                />
              )}
            />
            <Route exact path="/about" component={(props) => <About />} />
            <PrivateRoute
              path="/app"
              history={history}
              user={user}
              isAuthenticated={isAuthenticated}
              authLoadingStatus={authLoadingStatus}
              component={Contacts}
            />
            <Route
              exact
              path="/login"
              component={(props) => (
                <UserAuth
                  pageAction={"login"}
                  pageTitle={"Log in"}
                  isAuthenticated={isAuthenticated}
                  authLoadingStatus={authLoadingStatus}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              component={(props) => (
                <UserAuth
                  pageAction={"signup"}
                  pageTitle={"Sign up"}
                  isAuthenticated={isAuthenticated}
                  authLoadingStatus={authLoadingStatus}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      )}
    </Container>
  );
}

const mapPropsToState = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authLoadingStatus: state.auth.authLoadingStatus,
  };
};

export default connect(mapPropsToState)(App);
