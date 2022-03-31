import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { Fade } from "reactstrap";
import formatPhoneNumber from "../../utils/formatPhoneNumber";

import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineFileText,
} from "react-icons/ai";
import { Row, Col } from "reactstrap";

import ContactAvatar from "../../components/Avatar";
import ContactDeletePopover from "./ContactDeletePopover";

import { setCurrentContact } from "../../state/ContactSlice";
import { sortNotes } from "../../state/NoteSlice";

import "./scss/ContactItem.scss";

const ContactItem = ({
  contact,
  togglePopover,
  popoverIsOpen,
  onDeleteContact,
  filterBy,
  filterQuery,
  history,
  id
}) => {
  const dispatch = useDispatch();
  const { contactId } = useParams();
  const { path } = useRouteMatch();
  const { user } = useSelector((state) => state.auth);
  const { firstName, lastName, email, primaryPhone } = contact;

  useEffect(() => {
    if (filterBy === "notes") {
      dispatch(sortNotes({ notes: contact.notes, filterQuery }));
    }
  }, [filterBy, filterQuery, sortNotes]);

  return (
    <Col
      sm={{ size: 10, offset: 1 }}
      md={{ size: 8, offset: 2 }}
      xl={{ size: 4, offset: 4 }}
      className="px-0 pb-3 mb-3 mb-md-4 contact-item shadow rounded"
      id={`contact-${contact.id}`}
    >
      <Row className="contact-body position-relative rounded ">
        {/* DELETE CONTACT POPOVER */}

        {/* AVATAR */}
        <Row
          className="
            g-0
            pb-3
            border-bottom
            border-3
            border-info
            position-relative
            bg-secondary
            rounded-top
            "
        >
          <Col
            xs={{ size: 6, offset: 3 }}
            className="d-flex justify-content-center p-3"
          >
            <Link
              to={{
                pathname: `/app/detail/${contact.id}`,
                state: { referer: path },
              }}
            >
              <ContactAvatar user={user} id={id} />
            </Link>
          </Col>
          <Col
            xs={12}
            md={{ size: 8, offset: 2 }}
            className="contact-full-name text-center"
          >
            {contact.firstName} {contact.lastName}
          </Col>
          <Col
            xs={{ size: 6, offset: 3 }}
            md={{ size: 2, offset: 0 }}
            className="
                  d-flex
                  align-items-center justify-content-center 
                  justify-content-xl-end
                  mt-3 mt-md-0
                "
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
                onClick={() => togglePopover(contact.id, !popoverIsOpen)}
              />
            </span>
          </Col>
        </Row>
        {/* NAME, EMAIL AND PHONE */}
        {popoverIsOpen ? (
          <ContactDeletePopover
            togglePopover={togglePopover}
            popoverIsOpen={popoverIsOpen}
            onDeleteContact={onDeleteContact}
            contact={contact}
          />
        ) : (
          <Row className="g-0 px-4 px-md-3 mt-4 small position-relative">
            <Col
              xs={2}
              className="
                  field-icon
                  border-bottom
                  border-secondary
                  pb-3
                  pb-md-4
                  d-flex
                  justify-content-center
                  align-items-center
                "
            >
              <AiOutlineMail className="text-secondary" />
            </Col>
            <Col
              xs={10}
              className="contact-field border-bottom border-secondary pb-3 pb-md-4"
            >
              {email ? email : "Not Provided"}
            </Col>

            <Col
              xs={2}
              className="
                  field-icon
                  border-bottom
                  border-secondary
                  d-flex
                  justify-content-center
                  align-items-center
                  py-2 py-md-3

                "
            >
              <AiOutlinePhone className="text-secondary" />
            </Col>
            <Col
              xs={10}
              className="
                  contact-field
                  border-bottom
                  border-secondary
                  py-2 py-md-3

                "
            >
              {contact[`${primaryPhone.toLowerCase()}PhoneNumber`] ? (
                <span>
                  {formatPhoneNumber(
                    contact[`${primaryPhone.toLowerCase()}PhoneNumber`]
                  )}
                </span>
              ) : (
                "Not Provided"
              )}
            </Col>
            {!!contact.notes && (
              <>
                <Col
                  xs={2}
                  className="
                      field-icon
                      d-flex
                      justify-content-center
                      py-2 py-md-3
                    "
                >
                  <AiOutlineFileText className="text-secondary" />
                </Col>
                <Col
                  xs={10}
                  className="
                    contact-field
                    py-2 py-md-3
                  "
                >
                  {contact.notes.length > 0 &&
                    contact.notes.map((note, i) => (
                      <div>&bull; {note.text}</div>
                    ))}
                </Col>
              </>
            )}
          </Row>
        )}
      </Row>
    </Col>
  );
};

export default ContactItem;
