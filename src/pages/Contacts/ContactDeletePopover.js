import React from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Fade } from "reactstrap";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

import './scss/ContactDeletePopover.scss';
import { setCurrentContact } from "../../state/ContactSlice";

const ContactDeletePopover = ({
  popoverIsOpen,
  togglePopover,
  contact,
  onDeleteContact,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      {/* DELETE CONTACT POPOVER */}
      <Fade
        in={popoverIsOpen}
        className={
          "delete-contact-popover g-0 " +
          "border border-secondary rounded " +
          (popoverIsOpen ? "d-block" : "d-none")
        }
      >
        <Row className="g-0">
          <Col
            xs={12}
            className="
              delete-contact-popover-header
              text-center
              pt-4
              lead
              d-flex
              align-items-center
              justify-content-center
            "
            onClick={() => {
              togglePopover(contact.id, !popoverIsOpen);
            }}
          >
            <span>
              Delete?
            </span>
          </Col>
          <Col
            xs={{ size: 8, offset: 2 }}
            md={{ size: 6, offset: 3 }}
            className="
              delete-contact-popover-body
              d-flex
              align-items-center
              justify-content-around
              pb-4
            "
          >
            <span
              className="
                d-flex
                align-items-center
                justify-content-center
              "
              onClick={() => {
                dispatch(setCurrentContact(null))
                onDeleteContact(contact.id)}
            }
            >
              <AiOutlineCheckCircle className="delete-confirm-icon"/>
            </span>
            <span
              className="
                d-flex
                align-items-center
                justify-content-center
              "
              onClick={() => togglePopover(contact.id, !popoverIsOpen)}
            >
              <AiOutlineCloseCircle className="delete-cancel-icon"/>
            </span>
          </Col>
        </Row>
      </Fade>
    </>
  );
};

export default ContactDeletePopover;
