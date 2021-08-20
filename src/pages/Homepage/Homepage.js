import React from "react";
import "./Homepage.scss";

import { Row, Col, Jumbotron, Button, Spinner } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

const Homepage = ({ isAuthenticated, authLoadingStatus }) => {
  return (
    <Row className="row g-0" id="homepage-content">
      {authLoadingStatus === "PENDING" ? (
        <div className='spinner d-flex justify-content-center align-items-center'>
          <Spinner color="info">{' '}</Spinner>
        </div>
      ) : isAuthenticated ? (
        <Col xs={{ size: 6, offset: 3 }}>
          <Redirect to="/app" />
        </Col>
      ) : (
        <div className="col col-12 bg-app">
          <div className="row g-0">
            <div className="col col-12 bg-primary pb-3">
              <Jumbotron
                id="hero"
                className="mx-0"
                aria-label="Header image by: freephotocc"
              >
                <div
                  className="
                  row
                  g-0
                  pb-5
                  d-flex
                  flex-column
                  align-items-end
                  justify-content-end
                  align-items-md-center"
                  id="hero-content"
                >
                  <div
                    className="d-flex flex-column align-items-end justify-content-end align-items-md-center p-4 shadow"
                    id="hero-card"
                  >
                    <h1 className="display-1" id="header">
                      Contax
                    </h1>
                    <p className="lead">Your contacts, organized.</p>
                    <div className="row g-0 mt-3">
                      <div className="col col-12 py-2 pb-3">
                        <Link to="/signup">
                          <Button
                            size="lg"
                            className="btn-info shadow text-secondary"
                          >
                            Get Started
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Jumbotron>
            </div>
          </div>
          <div className="col col-12 bg-secondary" id="right-column"></div>
        </div>
      )}
    </Row>
  );
};

export default Homepage;
