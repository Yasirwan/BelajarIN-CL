import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteScratch } from "../../Redux/scratch/action";
import "./Scratch.css";
import startImage from '/img/start.png';
import questionImage from '/img/question.png';
import starImage from '/img/star.png';
import deleteImage from '/img/deletec.png';
import { useNavigate } from "react-router-dom";

const Scratch = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user: { userType },
  } = useSelector((store) => store.auth.data);

  const deleteScratchFunc = (id) => {
    dispatch(deleteScratch(id));
  };

  const handleClick = (id) => {
    return navigate(`/scratch/${id}`);
  };

  return (
    <div className="scratchDiv">
      <div>
        <img src={data.thumbnail} alt="thumbnail" />
      </div>
      <div>
        <div>
          <p>{data.title}</p>
          <p>{data.subject}</p>
          {/* <p>Class {data.class}</p> */}
          {/* <p className="scratchTime">{data.totalTime} mins</p> */}
        </div>
        <div className= "scratchRight">
          {/* <p className="scratchPoint"><img src={questionImage}/>Questions : {data.noOfQuestions}</p>
          <p className="scratchPoint"><img src={starImage}/>Points : {data.totalPoint}</p> */}
          {userType == "Admin" || userType == "Tutor" ? (
            <>
            <button
              className="deleteScratch"
              onClick={() => deleteScratchFunc(data._id)}
            >
              <img src={deleteImage}/>
            </button>
            <button className="startScratch" onClick={() => handleClick(data._id)}> <img src={startImage}/> </button>
            </>
          ) : (
            <button className="startScratch" onClick={() => handleClick(data._id)}> <img src={startImage}/> </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scratch;
