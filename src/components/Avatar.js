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
      {props.user && props.user.email === "guest@contax.com" ? (
        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ objectFit: "contain" }}>
          <img
            src={`https://picsum.photos/${200 + Math.abs(props.id - 5)}`}
            alt="Avatar"
            className="rounded-circle"
            style={{width:'90%'}}
          />
        </div>
      ) : (
        <AiOutlineCamera />
      )}
    </span>
  );
};

export default Avatar;
