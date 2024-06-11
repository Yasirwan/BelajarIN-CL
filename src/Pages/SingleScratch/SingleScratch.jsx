import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addResponse, getSingleScratchData } from "../../Redux/scratch/action";

// component imports
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

//css imports
import { Space, Spin } from "antd";
import "./SingleScratch.css";

const SingleScratch = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { singleScratch, load } = useSelector((store) => store.scratch);

  //form states
  const [desc, setDesc] = useState("");
  const [numberValue, setNumberValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addResponse(singleScratch?._id, desc));
    setNumberValue("");
  };

  useEffect(() => {
    dispatch(getSingleScratchData(params.id));
    setDesc("");
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="singleContent">
        <Header Title={"Scratch Details"} Address={"Scratch"} />
        <div className="singleContentData">
          {/* <div className="fileContainer">
            {singleScratch?.fileType == "jpg" ||
            singleScratch?.fileType == "jpeg" ? (
              <img src={singleScratch.fileUrl} alt="" />
            ) : (
              <video
                allow="fullscreen"
                frameBorder="0"
                width="100%"
                controls
                controlsList="nodownload"
              >
                <source src={singleScratch.fileUrl} />
              </video>
            )}
          </div> */}
          {/* {singleScratch ? (
            <div className="fileContainer">
              {singleScratch.fileType === "jpg" || singleScratch.fileType === "jpeg" ? (
                <img src={singleScratch.fileUrl} alt="" />
              ) : (
                <video
                  allow="fullscreen"
                  frameBorder="0"
                  width="100%"
                  controls
                  controlsList="nodownload"
                >
                  <source src={singleScratch.fileUrl} />
                </video>
              )}
            </div>
          ) : (
            <div>Loading...</div>
          )} */}
          {/* <div className="fileContainer">
            {singleScratch?.fileType === "jpg" || singleScratch?.fileType === "jpeg" || singleScratch?.fileType === "png" ? (
              <img src={singleScratch.fileUrl} alt="" />
            ) : (
              <video
                allow="fullscreen"
                frameBorder="0"
                width="100%"
                controls
                controlsList="nodownload"
              >
                <source src={singleScratch.fileUrl} />
              </video>
            )}
          </div> */}
        </div>

        <div className="scratchResponses">
          <p>{singleScratch?.title}</p>
          {/* <p>Class : {singleScratch?.class}</p> */}
          <p>{singleScratch?.subject}</p>
          <p>{singleScratch?.description}</p>
          {/* <p>Resolved : {singleScratch?.resolved == "Yes" ? "Yes" : "No"}</p> */}
        </div>

        <div class="mx-auto w-full max-w-screen-md">
          <div class="relative" style={{ paddingTop: "75%" }}>
            <iframe src="https://quizizz.com/join?gc=84045886" allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>
        </div>

        <div className="scratchResponses bg-customBlue rounded-lg p-4 my-2">
          <h3 className="text-white">Scratch Result</h3>
        </div>
        {singleScratch?.response?.map((data, i) => {
          return (
            <div key={i} className="scratchResponses">
              <p>Response no. : {i + 1}</p>
              <p>Description : {data}</p>
            </div>
          );
        })}

        <div className="scratchResponses">
        <p>Angket Web Studee</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdPMx18m2MKqi5S6mr_n0vwNUa9nsWo6XXCQxvxeRN8pU0_8A/viewform" className="inline-block bg-customBlue hover:bg-customBlue text-white font-bold py-2 px-4 rounded-2xl">Go To</a>
          {/* <br></br><p>Input Link Google Drive</p> */}
          {/* <p>Input Score</p>
          <form className="responseForm" onSubmit={(e) => handleSubmit(e)}>
            <input
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Screenshoot score"
            />
            <input
              name="numberInput"
              type="number"
              value={numberValue}
              onChange={(e) => setNumberValue(e.target.value)}
              placeholder="Score"
            />
            <input type="submit" />
          </form> */}
        </div>

        {load ? (
          <Space
            style={{
              width: "100vw",
              height: "100vh",
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.2)",
              top: "0",
              left: "0",
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
            }}
          >
            <Spin size="large"></Spin>
          </Space>
        ) : null}
        {/* <iframe src="https://scratch.mit.edu/projects/36385774/embed" allowtransparency="true" width="100%"
            height="800px" frameBorder="0" scrolling="yes" allowFullScreen></iframe> */}
      </div>
    </Navbar>
  );
};

export default SingleScratch;
