import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createContent3, getContent3Data } from "../../Redux/content/action3";

//components
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import Content3Box from "../../Components/Content/Content3Box";
import AddIcon from "../../Components/AddIcon/AddIcon";
import heroImage from '/img/hero2.png';

//css imports
import { Button, Drawer, Space, Spin, message } from "antd";
import "./Content.css";

const Content3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.auth.data);
  const { content, load } = useSelector((store) => store.content);

  //loading state
  const [loading, setLoading] = useState(false);

  //alert api
  const [messageApi, contextHolder] = message.useMessage();

  //drawer states and functions
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //form states and functions
  const initialFormData = {
    title: "",
    class: "",
    subject: "",
    // type: "",
    // creator: user?.name,
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //upload file states
  const [size, setSize] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  //upload refs
  const UploadRef = useRef();
  const WidgetRef = useRef();

  //upload and add content function
  const handleSubmit = () => {
    for (let keys in formData) {
      if (formData[keys] == "") {
        return alert("please fill all the details");
      }
    }
    if (size == "" || fileType == "" || fileUrl == "" || thumbnailUrl == "") {
      return alert("Please choose a correct file type");
    }
    let obj = { ...formData, size, fileType, thumbnailUrl, fileUrl };
    setLoading(true);
    dispatch(createContent3(obj)).then((res) => {
      if (res.msg == "Error") {
        setLoading(false);
        messageApi.open({
          type: "info",
          content3: "Error",
          duration: 3,
        });
      } else {
        setLoading(false);
        onClose();
        return messageApi.open({
          type: "info",
          content3: "Content Created",
          duration: 3,
        });
      }
    });
  };

  // cloudinary upload settings
  useEffect(() => {
    UploadRef.current = window.cloudinary;
    WidgetRef.current = UploadRef.current.createUploadWidget(
      {
        cloudName: "diverse",
        uploadPreset: "diverse",
        maxFiles: 1,
        clientAllowedFormats: ["jpg", "jpeg", "mp4"],
        maxFileSize: 52445000,
        thumbnailTransformation: [{ width: 240, height: 135, crop: "fill" }],
      },
      function (err, result) {
        if (result.info.secure_url) {
          setFileUrl(result.info.secure_url);
        }
        if (result.info.bytes) {
          setSize((result.info.bytes / 1000000).toFixed(3));
        }
        if (result.info.thumbnail_url) {
          setThumbnailUrl(result.info.thumbnail_url);
        }
        if (result.info.format) {
          setFileType(result.info.format);
        }
      }
    );
  }, []);

  useEffect(() => {
    dispatch(getContent3Data());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="content3">
        {/* header component */}
        <Header Title={"Session 1"} Address={"Session 1"} />

        {/* content component */}
        {/* <div className="content3Data">
          {content3?.map((data, i) => {
            return <Content3Box data={data} key={i} />;
          })}
        </div> */}

        <div class="m-6 p-4 bg-white rounded-lg shadow-md">
          <div class="container mx-auto px-2 py-4 flex flex-row items-center justify-center">
            <div class="flex flex-col md:flex-row md:items-center"> 
              <div class="overview-left mr-4 md:mr-8">
                <img class="md:w-48" src={heroImage} alt="Hero Image"/>
              </div>
            </div>

            <div class="overview-right ml-4 md:ml-8">
              <div class="container mx-auto">
                <h1 class="text-xl font-bold mb-2">Ayo, pelajari Algoritma, Naratif, Pseudocode, dan Flowchart dengan cara yang seru!</h1>
                <div class="flex flex-col items-start">
                  <p class="text-gray-600 mb-4">
                    Pada sesi pertama ini, kami akan membantumu untuk belajar dengan mendownload bahan bacaan dan menonton video menarik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="singleContent3Details bg-customBlue rounded-lg p-4 my-2">
          <h3 className="text-white font-bold text-center">Buku Siswa</h3>
        </div>

        <div className="singleContent3Details ">
      {/* <div>
        <img src={data.thumbnail} alt="thumbnail" />
      </div> */}
      
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 p-4">
          <div class="flex justify-between">
            <a href="https://drive.google.com/uc?export=download&id=1iipLbZlFsyCYbSRhoJMid4f28ZEhc30c" class="inline-block bg-cyan-400 text-white font-bold py-2 px-4 rounded-md">Download</a>
            <a target="_blank" href="https://drive.google.com/file/d/1iipLbZlFsyCYbSRhoJMid4f28ZEhc30c/view" class="inline-block bg-cyan-400 text-white font-bold py-2 px-4 rounded-md">View</a>
          </div>

          {/* <p className="lessonTime">{data.totalTime} mins</p> */}
        </div>
      </div>
    </div>

    <div className="singleContent3Details bg-customBlue rounded-lg p-4 my-2">
          <h3 className="text-white font-bold text-center">Video Pembelajaran</h3>
        </div>
        <div class="mx-auto w-full max-w-screen-xl">
        <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'bold' }}>Percabangan If</h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/6dAAX5B85PM"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'bold' }}>Percabangan If-Else</h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/6dAAX5B85PM"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>
          
          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'bold' }}>Percabangan If-Else-If</h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/lxIFFLFdBk"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'bold' }}>Percabangan Switch Case</h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/u5DpGWeVSG8"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'bold' }}>Percabangan Nested-If</h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/5jbYsYj1-v0"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'bold' }}>Perulangan For</h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/ZeqJewFm7zc"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'bold' }}>Perulangan While</h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/kO8iL-yR6uA"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'bold' }}>Perulangan Do-While</h3>
          <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/Pzy3XWzORNw"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

        </div>
        {user?.userType !== "Student" ? (
          <div onClick={showDrawer}>
            <AddIcon />
          </div>
        ) : (
          ""
        )}

        {/* create content drawer */}
        <Drawer
          title="Create Content"
          width={720}
          onClose={onClose}
          open={open}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
            </Space>
          }
        >
          <form>
            <input
              placeholder="Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Class"
              type="text"
              name="class"
              value={formData.class}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={(e) => handleFormChange(e)}
            />
            {/* <select name="class" onChange={(e) => handleFormChange(e)}>
              <option value="">Choose Class</option>
              <option value={5}>X PPLG 1</option>
              <option value={6}>X PPLG 2</option>
              <option value={7}>X PPLG 3</option>
              <option value={8}>X PPLG 4</option>
              <option value={9}>X PPLG 5</option>
              <option value={10}>X PPLG 6</option>
            </select>
            <select name="subject" onChange={(e) => handleFormChange(e)}>
              <option value="">Choose Subject</option>
              <option value="Maths">Algoritma</option>
              <option value="Physics">Naratif</option>
              <option value="Chemistry">Pseudocode</option>
              <option value="Biology">Flowchart</option>
              <option value="Political science">Pemrograman, Tipe data, Variabel dan Operator</option>
              <option value="History">Percabangan dan Perulangan</option>
            </select>
            <select name="type" onChange={(e) => handleFormChange(e)}>
              <option value="">Choose Content Type</option>
              <option value="Assignment">Video</option>
              <option value="Project">Book</option>
              <option value="Practice">LKPD</option>
            </select> */}
          </form>
          {size ? (
            <div className="uploadedImgDiv">
              <p>File Type : {fileType}</p>
              <p>File Size : {size} mb</p>
              <p>Thumbnail :</p>
              <img src={thumbnailUrl} alt="thumbnail" />
            </div>
          ) : (
            ""
          )}
          <button
            className="uploadBtn"
            onClick={() => WidgetRef.current.open()}
          >
            Upload File
          </button>
          <button className="submitBtn" onClick={handleSubmit}>
            Add Content
          </button>

          {/* drawer loading indicator  */}
          {loading ? (
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
        </Drawer>

        {/* main loading indicator  */}
        {contextHolder}
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

export default Content3;