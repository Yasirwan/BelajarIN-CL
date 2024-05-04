import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleContentData } from "../../Redux/content/action";

//component imports
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

//css imports
import "./SingleContent.css";

const SingleContent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  //redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { singleContent } = useSelector((store) => store.content);

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
    dispatch(getSingleContentData(params.id));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="singleContent">
        <Header Title={"Content"} Address={"Contents"} />

        {/* media component  */}
        <div className="singleContentData">
          <div className="fileContainer">
            {singleContent?.fileType == "jpg" ||
            singleContent?.fileType == "jpeg" ? (
              <img src={singleContent.fileUrl} alt="" />
            ) : (
              <video
                allow="fullscreen"
                frameBorder="0"
                width="100%"
                controls
                controlsList="nodownload"
              >
                <source src={singleContent.fileUrl} />
              </video>
            )}
          </div>
        </div>

        <div className="singleContentDetails">
          <p>{singleContent?.title}</p>
          <p>{singleContent?.class}</p>
          <p>{singleContent?.subject}</p>
          {/* <p>Content Type : {singleContent?.type}</p>
          <p>Tutor : {singleContent?.creator}</p> */}
        </div>

        <div class="mx-auto w-full max-w-screen-xl">
        <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'normal' }}>Percabangan if</h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/G-c0KnAgucc"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'normal' }}>Percabangan if-else </h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/VSL19lCLqHk"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>
          
          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'normal' }}>Percabangan if-else-if </h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/_lxIFFLFdBk"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>
          
          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'normal' }}>Percabangan nested-if </h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/5jbYsYj1-v0"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>
          
          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'normal' }}>Percabangan switch-case </h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/5lO9YdC48uw"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'normal' }}>Perulangan for </h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/hVzmJwyMH2Q"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'normal' }}>Perulangan while </h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/ctxtCv7plVc"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'normal' }}>Perulangan do-while </h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/kH8bkgogfD0"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

        </div>


      </div>
    </Navbar>
  );
};

export default SingleContent;
