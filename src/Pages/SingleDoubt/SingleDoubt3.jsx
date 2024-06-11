import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addResponse, getSingleDoubt3Data } from "../../Redux/doubt/action3";

// component imports
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

//css imports
import { Space, Spin } from "antd";
import "./SingleDoubt.css";
import heroImage from '/img/hero2.png';

const SingleDoubt3 = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { singleDoubt3, load } = useSelector((store) => store.doubt3);
  const { user } = useSelector((store) => store.auth.data);

  // form states
  const [descPengetahuanAwal, setDescPengetahuanAwal] = useState("");
  const [descFasePenstrukturan, setDescFasePenstrukturan] = useState("");
  const [descPengetahuanAkhir, setDescPengetahuanAkhir] = useState("");

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (type === "PengetahuanAwal") {
      dispatch(addResponse(singleDoubt3?._id, descPengetahuanAwal));
      setDescPengetahuanAwal("");
    } else if (type === "FasePenstrukturan") {
      dispatch(addResponse(singleDoubt3?._id, descFasePenstrukturan));
      setDescFasePenstrukturan("");
    } else if (type === "PengetahuanAkhir") {
      dispatch(addResponse(singleDoubt3?._id, descPengetahuanAkhir));
      setDescPengetahuanAkhir("");
    }
  };

  useEffect(() => {
    dispatch(getSingleDoubt3Data(params.id));
    setDescPengetahuanAwal("");
    setDescFasePenstrukturan("");
    setDescPengetahuanAkhir("");
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="singleContent">
      <Header Title={"Session 3"} Address={"Session 3"} />
        {/* <div className="singleContentData">
        <div className="fileContainer">
  {singleDoubt?.fileType === "jpg" || singleDoubt?.fileType === "jpeg" ? (
    <img src={singleDoubt?.fileUrl} alt="" />
  ) : (
    <video
      allow="fullscreen"
      frameBorder="0"
      width="100%"
      controls
      controlsList="nodownload"
    >
      <source src={singleDoubt?.fileUrl} />
    </video>
  )}
</div>

        </div> */}

        {/* <div className="doubtResponses"> */}
          {/* <p>{singleDoubt?.title}</p> */}
          {/* <p>Class : {singleDoubt?.class}</p> */}
          {/* <p>{singleDoubt?.subject}</p> */}
          {/* <p>{singleDoubt?.description}</p> */}
          {/* <p>Resolved : {singleDoubt?.resolved == "Yes" ? "Yes" : "No"}</p> */}
        {/* </div> */}

        <div class="m-6 p-4 bg-white rounded-lg shadow-md">
          <div class="container mx-auto px-2 py-4 flex flex-row items-center justify-center">
            <div class="flex flex-col md:flex-row md:items-center"> 
              <div class="overview-left mr-4 md:mr-8">
                <img class="md:w-48" src={heroImage} alt="Hero Image"/>
              </div>
            </div>

            <div class="overview-right ml-4 md:ml-8">
              <div class="container mx-auto">
                <h1 class="text-xl font-bold mb-2">Selamat kamu hampir mencapai akhir pembelajaran!</h1>
                <div class="flex flex-col items-start">
                  <p class="text-gray-600 mb-4">
                   Pada akhir sesi ini, silahkan bekerja sama dalam kelompok untuk menyelesaikan tugas yang diberikan. <br/>
                   Catat jawaban sesuai dengan format yang disediakan di bawah ini.<br/>
                   Setelah selesai, jangan lupa untuk mengirimkan jawaban melalui formulir yang telah kami sediakan.<br/>
                   Selamat mengerjakan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="assignmentResponses bg-customBlue rounded-lg p-4 my-2">
          <h3 className="text-white font-bold text-center">Lembar Kerja Peserta Didik (LKPD)</h3>
        </div>

        <div className="grid justify-items-center">
          <p className="p-4">Silahkan mengakses LKPD </p>
          <a target="_blank" href="https://docs.google.com/document/d/1Bwnms70dF0CpuFR6P2PQHTE2TnuXCgUj/edit?usp=sharing&ouid=112525555696106018803&rtpof=true&sd=true" class="inline-block bg-cyan-400 text-white font-bold py-2 px-4 rounded-md">View</a>
        </div>

        <div className="assignmentResponses bg-customBlue rounded-lg p-4 my-2">
          <h3 className="text-white font-bold text-center">Form Pengumpulan</h3>
        </div>

        <div className="doubt3Responses bg-white rounded-lg p-4 my-2">
          <form
            className="responseForm flex flex-col"
            onSubmit={(e) => handleSubmit(e, "PengetahuanAkhir")}
          >
                        <p className="text-center"> Link Google Drive </p>
            <input
              name="desc"
              className="mb-2 max-w-md mx-auto border-customBlue"
              value={descPengetahuanAkhir}
              onChange={(e) => setDescPengetahuanAkhir(e.target.value)}
              placeholder="Contoh : Kelompok 1, https://drive.google.com"
            />
              <input type="submit" className="bg-customBlue hover:bg-customBlue text-white py-2 px-4 rounded-2xl border-none max-w-md mx-auto" />
          </form>
        </div>

        <div className="singleContentDetails bg-customBlue rounded-lg p-4 my-2">
          <h3 className="text-white font-bold text-center">Form Tanggapan Multimedia Interaktif</h3>
        </div>

        <div className="singleContentDetails ">
      
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 p-4">
          <div class="grid justify-items-center">
            <p className="p-4">Silahkan klik tombol Start untuk memulai</p>
            <a target="_blank" href="https://forms.gle/CfeEGaNkjekQhbwk6" class="inline-block bg-cyan-400 text-white font-bold py-2 px-4 rounded-md">Start</a>
          </div>
        </div>
      </div>
    </div>

{singleDoubt3?.response?.map((data, i) => {
  if (user?.userType === "Admin") {
    return (
      <div
        key={i}
        className="doubt3Responses bg-red-100 rounded-lg p-4 my-2"
      >
        <p>No. {i + 1}</p>
        <p>{data}</p>
      </div>
    );
  } else {
    return null;
  }
})}


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
      </div>
    </Navbar>
  );
};

export default SingleDoubt3;