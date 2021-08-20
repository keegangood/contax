import React, { Component } from "react";
import { AiOutlineCheck } from "react-icons/ai";

const AboutListItem = ({ text, showDecoration }) => {
  return (
    <li className="mb-2">
      {showDecoration && (
        <span className="pe-3">
          <AiOutlineCheck />
        </span>
      )}
      {text}
    </li>
  );
};

export default AboutListItem;
