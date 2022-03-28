import React, { useState, useEffect } from "react";

import { Row, Col } from "reactstrap";

import ContactItem from "./ContactItem";

import "./scss/ContactList.scss";

const ContactList = ({ contacts, onDeleteContact }) => {
  let [popoversOpen, setPopoversOpen] = useState({});

  // close all popovers on mount
  useEffect(() => {
    if (contacts) {
      let popovers = {};
      contacts.forEach((contact) => (popovers[contact.id] = false));

      setPopoversOpen(popovers);
    }
  }, [contacts]);

  const togglePopover = (contactId, isOpen) => {
    let updatedPopovers = {};

    // set the value at contactId to true and all the rest to false
    Object.keys(popoversOpen).forEach((popoverId) => {
      // == because contactId is a string and popoverId is a number
      if (contactId == popoverId) {
        updatedPopovers[popoverId] = isOpen;
        isOpen = false;
      } else {
        updatedPopovers[popoverId] = false;
      }
    });

    // update state
    setPopoversOpen(updatedPopovers);
  };

  return (
    <Row className="g-0 mx-3 pt-md-5 mt-5" id="contact-list">
      {contacts.length === 0
        ? <Col xs={12} lg={8} className="text-center">
          <h1 className="display-1 text-secondary">
            No contacts
          </h1>
        </Col>
        : contacts.map((contact, i) => (
            <ContactItem
              contact={contact}
              togglePopover={togglePopover}
              popoverIsOpen={popoversOpen[contact.id]}
              onDeleteContact={onDeleteContact}
              key={i}
            />
          ))}
    </Row>
  );
};

export default ContactList;
