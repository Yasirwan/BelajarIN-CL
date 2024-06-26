import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAssignment, getAssignmentData } from "../../Redux/assignment/action";

//components
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import AssignmentBox from "../../Components/Assignment/AssignmentBox";
import AddIcon from "../../Components/AddIcon/AddIcon";
import heroImage from '/img/hero2.png';

//css imports
import { Button, Drawer, Space, Spin, message } from "antd";
import "./Assignment.css";

const Assignment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.auth.data);
  const { assignment, load } = useSelector((store) => store.assignment);

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
    // class: "",
    subject: "",
    type: "",
    creator: user?.name,
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

  //upload and add assignment function
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
    dispatch(createAssignment(obj)).then((res) => {
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
          content: "Assignment Created",
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
    dispatch(getAssignmentData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="assignment">
        {/* header component */}
        <Header Title={"Session 3"} Address={"Session 3"} />

        {/* assignment component */}
        {/* <div className="assignmentData">
          {assignment?.map((data, i) => {
            return <AssignmentBox data={data} key={i} />;
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
        
        <div className="singleAssignmentDetails">
          <p>Jawablah titik titik dibawah ini mengenai bagaimana kalimat Naratif pada studi kasus membuat indomie goreng diubah menjadi Pseudocode, dan Flowchart!
1.	Naratif
Membuat Indomie Goreng
Langkah 1: Siapkan bahan mi instan, minyak goreng, telur, sayuran, bumbu mie instan, dan air.
Langkah 2: Buka bungkus mi instan dan masukkan mi ke dalam air mendidih.
Langkah 3: Pecahkan telur ke dalam wajan yang sudah dipanaskan
Langkah 4: Tambahkan sayuran yang sudah dipotong ke dalam wajan bersama telur.
Langkah 5: Aduk telur dan sayuran.
Langkah 6: Setelah mi empuk, tiriskan airnya dan masukkan mi ke dalam wajan bersama telur dan sayuran.
Langkah 7: Tambahkan bumbu mie instan ke dalam mi di wajan.
Langkah 8: Aduk semua bahan hingga tercampur rata dan bumbu merata di seluruh mi.
Langkah 9: Setelah matang, angkat mi goreng dari wajan dan pindahkan ke dalam piring saji.
Langkah 10: Hidangkan mi goreng dengan taburan daun bawang atau bahan lain sesuai selera.
2.	Pseudocode
</p>
        </div>

        <div className="assignmentResponses bg-customBlue rounded-lg p-4 my-2">
          <h3 className="text-white font-bold text-center">Form Pengumpulan</h3>
        </div>

        <div className="assignmentResponses">
          <form className="responseForm flex flex-col" onSubmit={(e) => handleSubmit(e)}>
              <input
                  name="desc"
                  className="mb-2 max-w-md mx-auto border-customBlue"
                  // value={desc}
                  // onChange={(e) => setDesc(e.target.value)}
                  placeholder="Link gdrive screenshoot"
              />
              <input type="submit" className="bg-customBlue hover:bg-customBlue text-white py-2 px-4 rounded-2xl border-none max-w-md mx-auto" />
          </form>
      </div>

        {user?.userType !== "Student" ? (
          <div onClick={showDrawer}>
            <AddIcon />
          </div>
        ) : (
          ""
        )}

        {/* create assignment drawer */}
        <Drawer
          title="Create Assignment"
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
              placeholder="Description"
              type="text"
              name="type"
              value={formData.type}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Description"
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
              <option value="">Choose Assignment Type</option>
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
            Add Assignment
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

export default Assignment;
