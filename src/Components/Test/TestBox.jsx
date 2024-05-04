import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTest } from "../../Redux/test/action";
import viewImage from '/img/start.png';
import deleteImage from '/img/deletec.png';

import "./TestBox.css";

const TestBox = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth.data);

  const handleDelete = (id) => {
    dispatch(deleteTest(id));
  };
  const handleClick = (id) => {
    return navigate(`/test/${id}`);
  };

  return (
    <div className="testDiv">
      <div>
        <img src={data.thumbnailUrl} alt="thumbnail" />
      </div>
      <div>
        <div>
          <p>{data.title}</p>
          {/* <p>{data.subject}</p> */}
          <p>{data.class}</p>
        </div>
        <div>
          {user.userType == "Admin" ? (
            <div className="testOption">
              {/* <p>{data.type}</p> */}
              <button onClick={() => handleClick(data._id)}><img src={viewImage}/> </button>
              <button onClick={() => handleDelete(data._id)}><img src={deleteImage}/></button>
            </div>
          ) : (
            <div className="testOption">
              {/* <p>{data.type}</p> */}
              <button onClick={() => handleClick(data._id)}><img src={viewImage}/> </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestBox;
