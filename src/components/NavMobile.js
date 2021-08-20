import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, NavLink, Row, Col, Fade } from "reactstrap";
import Avatar from "./Avatar";
import Hamburger from "./Hamburger";
import ContactFilter from "../pages/Contacts/ContactFilter";
import "./scss/NavMobile.scss";

const NavMobile = ({ user, onLogout, path, navOpen, setNavOpen, history }) => {
  const [isHidden, setIsHidden] = useState(true);

  const location = useLocation();

  return (
    <>
      <Navbar
        id="nav-desktop"
        className="
          position-relative
          position-fixed
          top-0
          shadow
          pb-0
        "
      >
        <Row
          className="
            g-0 w-100
            border-bottom
            border-3
            border-info
            pb-2
          "
        >
          <Col xs={2}>
            <Link to="/app" id="navbar-title" className="ps-2">
              Contax
            </Link>
          </Col>
          {user && location.pathname === "/app" && (
            <Col xs={{ size: 7, offset: 1 }} className="d-flex ">
              <ContactFilter />
            </Col>
          )}
          <Col
            xs={1}
            className="
              d-flex
              align-items-center
            "
          >
            <Hamburger navOpen={navOpen} setNavOpen={setNavOpen} />
          </Col>
        </Row>
      </Navbar>

      {navOpen && (
        <>
          <Fade
            in={navOpen}
            id="nav-mobile"
            className="position-absolute position-fixed top-0"
          >
            <Fade in={navOpen} id="nav-content">
              <Row className="g-0 pb-5 border-bottom border-info border-5">
                <Col xs={10} className="mb-3">
                  <Link
                    to="/app"
                    id="navbar-title"
                    className="px-3"
                    onClick={() => {
                      setNavOpen(!navOpen);
                    }}
                  >
                    Contax
                  </Link>
                </Col>
                <Col xs={2}>
                  <Hamburger navOpen={navOpen} setNavOpen={setNavOpen} />
                </Col>
                <Col
                  xs={6}
                  className="
                    d-flex
                    flex-column
                    align-items-center
                    justify-content-center
                    pb-5
                  "
                >
                  {user ? (
                    <>
                      <Avatar
                        contact={user}
                        border={{ color: "secondary", width: 3 }}
                      />
                      <div id="username-value" className="">
                        {user.username}
                      </div>
                    </>
                  ) : (
                    <div className="align-self-end mb-auto">
                      <NavLink
                        className="text-right"
                        tag={Link}
                        to="/login"
                        onClick={() => {
                          setNavOpen(!navOpen);
                        }}
                      >
                        Log in
                      </NavLink>
                      <NavLink
                        className="text-right"
                        tag={Link}
                        to="/signup"
                        onClick={() => {
                          setNavOpen(!navOpen);
                        }}
                      >
                        Sign up
                      </NavLink>
                    </div>
                  )}
                </Col>
                <Col xs={6} className="pb-5">
                  <NavLink
                    tag={Link}
                    to="/app"
                    onClick={() => {
                      setNavOpen(!navOpen);
                    }}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    tag={Link}
                    to="/about"
                    onClick={() => {
                      setNavOpen(!navOpen);
                    }}
                  >
                    About
                  </NavLink>
                  {user && (
                    <NavLink
                      tag={Link}
                      onClick={() => {
                        setNavOpen(!navOpen);
                        onLogout();
                      }}
                    >
                      Log out
                    </NavLink>
                  )}
                </Col>
              </Row>
            </Fade>
          </Fade>
        </>
      )}
    </>
  );
};

export default NavMobile;
