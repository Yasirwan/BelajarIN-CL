import React from "react";
import { FaPlus } from "react-icons/fa";
import "./AddIcon.css";
import { Tooltip } from "antd";

const AddIcon = () => {
  return (
    <Tooltip placement="leftTop" title="Add New" color= "var(--bb)">
      <div className="addAdmin bg-sky-500 hover:bg-sky-700 ">
        <FaPlus />
      </div>
    </Tooltip>
  );
};

export default AddIcon;
