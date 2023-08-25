import React, { useState } from "react";
import { BsToggleOn } from "react-icons/bs";

const Theme = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <button onClick={() => handleToggle()}>
        <BsToggleOn />
      </button>

      {/* <input /> */}
    </div>
  );
};

export default Theme;
