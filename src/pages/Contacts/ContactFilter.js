import titleize from "../../utils/titleize";
import React, { useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";

import {
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Input,
  InputGroup,
  InputGroupButtonDropdown,
} from "reactstrap";

import { filterContacts, setFilterBy } from "../../state/ContactSlice";

const ContactFilter = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { filterBy, filterQuery } = useSelector((state) => state.contacts);
  const onChange = (e) => {
    dispatch(filterContacts(e.target.value));
  };

  const OPTIONS = ["name", "email", "phone"] //, "notes"];

  return (
    <div className="w-100" id="contact-filter">
      <InputGroup>
        <Input placeholder="Filter contacts..." onChange={onChange} />

        <InputGroupButtonDropdown
          addonType="append"
          isOpen={isOpen}
          toggle={() => {
            setIsOpen(!isOpen);
          }}
        >
          <DropdownToggle caret>{titleize(filterBy)}</DropdownToggle>
          <DropdownMenu>
            {OPTIONS.map((option, i) => (
              <DropdownItem
                key={i}
                onClick={() => {
                  dispatch(setFilterBy(option));
                }}
              >
                {titleize(option)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </InputGroupButtonDropdown>
      </InputGroup>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filterBy: state.contacts.filterBy,
    filterQuery: state.contacts.filterQuery,
  };
};

export default connect(mapStateToProps)(ContactFilter);
