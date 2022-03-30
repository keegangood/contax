import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Row, Col, Navbar, Nav, NavLink } from "reactstrap";

import Avatar from "./Avatar";
import ContactFilter from "../pages/Contacts/ContactFilter";
import ContactAvatar from "../components/Avatar";

import "./scss/NavDesktop.scss";

const NavDesktop = ({ isAuthenticated, user, onLogout }) => {
  const location = useLocation();

  return (
    <Navbar
      id="nav-desktop"
      className="
        position-absolute
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
          pb-1
        "
      >
        <Col xs={6} className="d-flex gap-2 align-items-center">
          <NavLink
            to="/app"
            id="navbar-title"
            className="ps-2 ps-lg-4"
            style={{ display: "flex", alignItems: "flex-end" }}
            >
            Contax
          </NavLink>
          
        </Col>
        
        <Col xs={6} sm={5} md={6} className="d-flex justify-content-end">
          <Nav>
          <NavLink
            tag={Link}
            to="/about"
            style={{ display: "flex", alignItems: 'center' }}
          >

            About
          </NavLink>
            {user && (
              <NavLink
                tag={Link}
                onClick={onLogout}
                style={{ display: "flex", alignItems: "center" }}
              >
                Log out
              </NavLink>
            )}
            <span className="d-flex">
              {user ? (
                <>
                  <NavLink
                    tag={Link}
                    to="/login"
                    className="py-0 my-auto"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <ContactAvatar user={user} id={1} />
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    tag={Link}
                    to="/login"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    tag={Link}
                    to="/signup"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Sign up
                  </NavLink>
                </>
              )}
            </span>
          </Nav>
        </Col>
      </Row>
      {isAuthenticated && location.pathname === "/app" && (
        <Row className="g-0 bg-primary w-100 py-2">
          <Col xs={{ size: 6, offset: 3 }}>
            <ContactFilter />
          </Col>
        </Row>
      )}
    </Navbar>
  );
};

export default NavDesktop;
