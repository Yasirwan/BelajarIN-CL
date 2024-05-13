import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAssignmentData } from "../../Redux/assignment/action";

//component imports
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

//css imports
import "./SingleAssignment.css";

const SingleAssignment = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  //redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { singleAssignment } = useSelector((store) => store.assignment);

  const [desc, setDesc] = useState("");

  // disabling right click
  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  useEffect(() => {
    dispatch(getSingleAssignmentData(params.id));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="singleAssignment">
        <Header Title={"Assignment"} Address={"Assignments"} />

        {/* media component  */}
        <div className="singleAssignmentData">
          <div className="fileContainer">
            {singleAssignment?.fileType == "jpg" ||
            singleAssignment?.fileType == "jpeg" ? (
              <img src={singleAssignment.fileUrl} alt="" />
            ) : (
              <video
                allow="fullscreen"
                frameBorder="0"
                width="100%"
                controls
                controlsList="nodownload"
              >
                <source src={singleAssignment.fileUrl} />
              </video>
            )}
          </div>
        </div>

        <div className="singleAssignmentDetails">
          <p>{singleAssignment?.title}</p>
          {/* <p>Class : {singleAssignment?.class}</p> */}
          <p>{singleAssignment?.subject}</p>
          <p>{singleAssignment?.type}</p>
          {/* <p>Tutor : {singleAssignment?.creator}</p> */}
        </div>

        <div className="assignmentResponses bg-customBlue rounded-lg p-4 my-2">
          <h3 className="text-white">Fase Aplikasi</h3>
        </div>
        
        {singleAssignment?.response?.map((data, i) => {
          return (
            <div key={i} className="assignmentResponses">
              <p>Absen no. : {i + 1}</p>
              <p>{data}</p>
            </div>
          );
        })}

        <div className="assignmentResponses">
          <p>Form pengumpulan LKPD</p>
          <a href="https://bit.ly/lkpdweek2" className="inline-block bg-customBlue hover:bg-customBlue text-white font-bold py-2 px-4 rounded-2xl">Submit</a>
          {/* <br></br><p>Input Link Google Drive</p> */}
          <form className="responseForm" onSubmit={(e) => handleSubmit(e)}>
            {/* <input
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
            />
            <input type="submit" /> */}
          {/* <p>or try this :</p>
          <p>bit.ly/lkpdweek2</p> */}
          </form>
        </div>
      </div>
    </Navbar>
  );
};

export default SingleAssignment;
