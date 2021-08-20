import { React } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Spinner } from "reactstrap";

const PrivateRoute = ({
  component: Component,
  user,
  isAuthenticated,
  authLoadingStatus,
  history,
  ...rest
}) => {
  return (
    <Route
      // pass the rest of the props
      {...rest}
      render={(props) =>
        // if not authenticated when loaded, redirect to login page
        authLoadingStatus === "PENDING" ? (
          <div className="spinner d-flex align-items-center justify-content-center">
            <Spinner color="info"> </Spinner>
          </div>
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { referer: props.history.location.pathname },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
