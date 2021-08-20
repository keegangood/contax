import React from "react";
import { AiOutlineCamera } from "react-icons/ai";

const Avatar = (props) => {
  return (
    <span
      className={
        "contact-avatar rounded-circle bg-success " +
        "d-flex align-items-center justify-content-center text-secondary" +
        (props.border
          ? `border border-${props.border.color} border-${props.border.width}`
          : "")
      }
    >
      {/* LOAD USER AVATAR ONCE AVAILABLE */}
      <AiOutlineCamera />
    </span>
  );
};

export default Avatar;
