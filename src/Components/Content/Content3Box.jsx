import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteContent3 } from "../../Redux/content/action3";
import viewImage from '/img/view.png';
import deleteImage from '/img/deletec.png';

import "./ContentBox.css";

const Content3Box = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth.data);

  const handleDelete = (id) => {
    dispatch(deleteContent3(id));
  };
  const handleClick = (id) => {
    return navigate(`/content3/${id}`);
  };

  return (
    <div className="content3Div">
      <div>
        <img src={data.thumbnailUrl} alt="thumbnail" />
      </div>
      <div>
        <div>
          <p>{data.title}</p>
          <p>{data.subject}</p>
          <p> {data.class}</p>
        </div>
        <div>
          {user.userType == "Admin" || user.userType == "Tutor" ? (
            <div className="content3Option">
              <p>{data.type}</p>
              <button onClick={() => handleClick(data._id)}><img src={viewImage}/> </button>
              <button onClick={() => handleDelete(data._id)}><img src={deleteImage}/></button>
            </div>
          ) : (
            <div className="content3Option">
              <p>{data.type}</p>
              <button onClick={() => handleClick(data._id)}><img src={viewImage}/> </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content3Box;
