import React, { Fragment, useState, useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector, connect } from "react-redux";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import titleize from "../../utils/titleize";
import formatPhoneNumber from "../../utils/formatPhoneNumber";
import { Container, Row, Col, Spinner } from "reactstrap";

import {
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineMail,
  AiOutlinePhone,
  AiFillStar,
  AiOutlineFileText,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

import { RiCake2Line } from "react-icons/ri";

import Avatar from "../../components/Avatar";

import { requestAccessToken } from "../../state/AuthSlice";
import { getContactDetail, setCurrentContact } from "../../state/ContactSlice";

import "./scss/ContactDetail.scss";

const ContactDetail = ({ history }) => {
  const PHONE_TYPES = ["CELL", "HOME", "WORK"];
  const dispatch = useDispatch();
  const { contactId } = useParams();
  const { path } = useRouteMatch();
  const { currentContact, contactLoadingStatus } = useSelector(
    (state) => state.contacts
  );
  const [contact, setContact] = useState({});

  // RETRIEVE SINGLE CONTACT
  // get the contact object for the contactId in url params
  useEffect(() => {
    if (contactId && !currentContact)
      (async () => {
        await dispatch(requestAccessToken())
          .then(unwrapResult)
          .then((res) => {
            const { accessToken } = res;
            dispatch(getContactDetail({ contactId, accessToken }))
              .then(unwrapResult)
              .then((res) => {
                const { contact } = res;
                dispatch(setCurrentContact(contact));
              })
              .catch((err) => {
                history.push("/app");
                // set message "contact not found"
              });
          })
          .catch((err) => {
            history.push("/login");
          });
      })();
  }, [contactId, contactLoadingStatus]);

  useEffect(() => {
    if (currentContact) {
      const {
        firstName,
        lastName,
        email,
        primaryPhone,
        birthday,
        notes,
        cellPhoneNumber,
        homePhoneNumber,
        workPhoneNumber,
      } = currentContact;
    }
    setContact({
      ...currentContact,
    });
  }, [currentContact]);

  return (
    <>
      {contactLoadingStatus === "PENDING" ? (
        <div className="spinner d-flex justify-content-center align-items-center">
          <Spinner color="info"> </Spinner>
        </div>
      ) : (
        currentContact && (
          <Container className="py-5" id="contact-detail-content">
            <Row className="g-0 mt-5 pt-5">
              <Col
                xs={12}
                md={{ size: 10, offset: 1 }}
                className="
              bg-secondary
              rounded
              "
              >
                {/* DETAIL HEADER */}
                <Row
                  className="
                g-0
                pb-3
                border-bottom
                border-3
                border-info
                "
                >
                  <Col
                    xs={{ size: 6, offset: 3 }}
                    className="d-flex justify-content-center p-3"
                  >
                    <Avatar className="contact-avatar" />
                  </Col>
                  <Col
                    xs={3}
                    className="
                  close-icon
                  d-flex justify-content-end
                  p-3
                  "
                  >
                    <AiOutlineCloseCircle />
                  </Col>
                  <Col xs={12} className="contact-full-name text-center">
                    {firstName} {lastName}
                  </Col>
                  <Col
                    xs={{ size: 6, offset: 3 }}
                    className="
                    d-flex
                    align-items-center justify-content-center 
                    justify-content-md-end
                    mt-3"
                  >
                    <Link
                      to={{
                        pathname: `/app/edit/${contact.id}`,
                        state: { referer: path },
                      }}
                    >
                      <AiOutlineEdit
                        className="crud-icon edit-icon m-2"
                        onClick={() => {
                          dispatch(setCurrentContact(contact));
                        }}
                      />
                    </Link>
                    <span className="position-relative">
                      <AiOutlineDelete
                        id={`contact-${contact.id}-popover`}
                        className="crud-icon delete-icon m-2"
                        // onClick={() => togglePopover(contact.id, !popoverIsOpen)}
                      />
                    </span>
                  </Col>
                </Row>

                {/* DETAIL FIELDS */}
                <Row className="g-0 p-3 bg-primary">
                  {/* EMAIL FIELD */}
                  <Col
                    xs={2}
                    md={1}
                    className="
                  field-icon
                  border-bottom
                  border-secondary
                    pt-3
                    pb-2
                    mb-3
                    mb-md-4
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                  >
                    <AiOutlineMail className="text-secondary" />
                  </Col>
                  <Col
                    xs={10}
                    md={11}
                    className="
                      contact-field
                      border-bottom
                      border-secondary
                      mb-3 mb-md-4
                      ps-3
                      pb-2
                      d-flex align-items-end
                    "
                  >
                    {currentContact.email
                      ? currentContact.email
                      : "Not Provided"}
                  </Col>
                  {/* PHONE FIELDS */}
                  <Col
                    xs={2}
                    md={1}
                    className="
                      field-icon
                      border-bottom
                      border-secondary
                      pt-md-2
                      mb-3
                      mb-md-4
                      d-flex
                      justify-content-center
                    "
                  >
                    <AiOutlinePhone className="text-secondary" />
                  </Col>
                  <Col
                    xs={10}
                    md={5}
                    className="
                      contact-field
                      border-bottom
                      border-secondary
                      mb-3 mb-md-4
                      ps-3 pb-3
                    "
                  >
                    {PHONE_TYPES.map((PHONE_TYPE) => (
                      <Row className="g-0">
                        <Col
                          xs={2}
                          className="
                            phone-type-label
                            d-flex align-items-center
                            small pt-2 mb-2
                            border-bottom border-secondary
                          "
                        >
                          {titleize(PHONE_TYPE)}
                        </Col>
                        <Col
                          xs={6}
                          sm={7}
                          className="border-bottom border-secondary mb-2 pt-2 ps-2"
                        >
                          {formatPhoneNumber(
                            currentContact[
                              `${PHONE_TYPE.toLowerCase()}PhoneNumber`
                            ] || ""
                          )}
                        </Col>
                        <Col
                          xs={2}
                          md={2}
                          className="
                            text-warning ps-3 
                            border-bottom
                            border-secondary
                            mb-2
                            pt-2 pt-md-0
                          "
                        >
                          {currentContact[
                            `${currentContact.primaryPhone.toLowerCase()}PhoneNumber`
                          ] &&
                            currentContact.primaryPhone === PHONE_TYPE && (
                              <AiFillStar title="Primary phone" />
                            )}
                        </Col>
                      </Row>
                    ))}
                  </Col>

                  {/* BIRTHDAY FIELD */}
                  <Col
                    xs={2}
                    md={1}
                    className="
                      field-icon
                      border-bottom
                      border-secondary
                      pt-3 pt-md-2
                      pb-2 
                      mb-3
                      mb-md-4
                      d-flex
                      justify-content-center
                      align-items-center
                      justify-content-md-start
                      align-items-md-start
                    "
                  >
                    <RiCake2Line className="text-secondary" />
                  </Col>
                  <Col
                    xs={10}
                    md={5}
                    className="
                      contact-field
                      border-bottom
                      border-secondary
                      mb-3 mb-md-4
                      pb-2 pt-md-2
                      ps-3 ps-lg-0
                      d-flex align-items-end
                      align-items-md-start
                    "
                  >
                    {currentContact.birthday
                      ? dayjs(currentContact.birthday).format("M / DD / YYYY")
                      : "Not Provided"}
                  </Col>

                  {/* NOTES FIELD */}
                  <Col
                    xs={2}
                    md={1}
                    className="
                      field-icon
                      border-bottom
                      border-secondary
                      pt-3 pt-lg-0
                      mb-3
                      pb-2
                      mb-md-4
                      d-flex
                      justify-content-center
                    "
                  >
                    <AiOutlineFileText className="text-secondary" />
                  </Col>
                  <Col
                    xs={10}
                    md={11}
                    className="
                      contact-field
                      border-bottom
                      border-secondary
                      mb-3 mb-md-4
                      py-3 py-lg-0
                      ps-3
                      d-flex flex-column
                    "
                  >
                    {currentContact.notes.map((note, i) => (
                      <span className="pb-2">&bull; {note.text}</span>
                    ))}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        )
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
    currentContact: state.contacts.currentContact,
  };
};

export default connect(mapStateToProps)(ContactDetail);
