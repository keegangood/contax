import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Row, Col, Navbar, Nav, NavLink } from "reactstrap";

import Avatar from "./Avatar";
import ContactFilter from "../pages/Contacts/ContactFilter";

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
        <Col xs={1}>
          <Link to="/app" id="navbar-title" className="ps-2">
            Contax
          </Link>
        </Col>
        <Col xs={5} className="d-flex">
          <NavLink tag={Link} to="/about">
            About
          </NavLink>
        </Col>
        <Col xs={6} className="d-flex justify-content-end">
          <Nav>
            {user && (
              <NavLink tag={Link} onClick={onLogout}>
                Log out
              </NavLink>
            )}
            <span className="d-flex">
              {user ? (
                <>
                  <NavLink tag={Link} to="/login" className="py-0 my-auto">
                    <Avatar contact={user} />
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink tag={Link} to="/login">
                    Log in
                  </NavLink>
                  <NavLink tag={Link} to="/signup">
                    Sign up
                  </NavLink>
                </>
              )}
            </span>
          </Nav>
        </Col>
      </Row>
      {(isAuthenticated && location.pathname === '/app') && (
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
