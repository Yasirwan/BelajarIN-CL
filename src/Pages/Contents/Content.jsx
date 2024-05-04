import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createContent, getContentData } from "../../Redux/content/action";

//components
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import ContentBox from "../../Components/Content/ContentBox";
import AddIcon from "../../Components/AddIcon/AddIcon";

//css imports
import { Button, Drawer, Space, Spin, message } from "antd";
import "./Content.css";

const Content = () => {
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
    dispatch(createContent(obj)).then((res) => {
      if (res.msg == "Error") {
        setLoading(false);
        messageApi.open({
          type: "info",
          content: "Error",
          duration: 3,
        });
      } else {
        setLoading(false);
        onClose();
        return messageApi.open({
          type: "info",
          content: "Content Created",
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
    dispatch(getContentData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="content">
        {/* header component */}
        <Header Title={"Video"} Address={"Video"} />

        {/* content component */}
        <div className="contentData">
          {content?.map((data, i) => {
            return <ContentBox data={data} key={i} />;
          })}
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

export default Content;
