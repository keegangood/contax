import React from "react";
import { useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { setCurrentContact } from "../state/ContactSlice";

import "./scss/PlusButton.scss";

const PlusButton = ({ history }) => {
  const dispatch = useDispatch();
  return (
    <Link to="/app/add">
      <div
        className="w-auto position-fixed m-2 p-0 shadow"
        id="plus-button"
        onClick={() => dispatch(setCurrentContact(null))}
      >
        <AiOutlinePlus />
      </div>
    </Link>
  );
};

export default PlusButton;
