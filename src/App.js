import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

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

function App({ history }) {
  const dispatch = useDispatch();

  let { isAuthenticated, authLoadingStatus, user } = useSelector(
    (state) => state.auth
  );
  const { alerts } = useSelector((state) => state.alerts);

  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !user && authLoadingStatus === "PENDING") {
      (async () => {
        console.log('REQUESTING TOKEN FROM APP')
        await dispatch(requestAccessToken());
      })();
    }
  }, [isAuthenticated, user, authLoadingStatus]);

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
      {authLoadingStatus === "PENDING" ? (
        <div
          className="
            spinner
            d-flex
            align-items-center
            justify-content-center
          "
        >
          <Spinner color="info"> </Spinner>
        </div>
      ) : (
        <div className="mt-5">
          {alerts.length > 0 && <Alerts alerts={alerts} />}
          <span className="d-none d-md-block">
            <NavDesktop
              user={user}
              onLogout={onLogout}
              isAuthenticated={isAuthenticated}
            />
          </span>
          <span className="d-block d-md-none">
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
