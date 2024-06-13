import React, { useEffect, useState } from "react";
import "./Lessonsx.css";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import AddIcon from "../../Components/AddIcon/AddIcon";
import Lessonx from "../../Components/Lesson/Lessonx";
import { Button, Drawer, Space, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createLessonx, getLessonxData } from "../../Redux/lesson/actionx";
import { useNavigate } from "react-router-dom";
import deleteImage from '/img/deletec.png';
import logo from "../../Assets/logo.png";
import ava from "../../Assets/useravatar.png";
import coverImage from '/img/cover.png';
import ava_yasir from "../../Assets/ava_iyas.jpg";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { IoLogoInstagram } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { MdNavigateNext } from "react-icons/md";

const Lessonsx = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useSelector((store) => store.auth.data);
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const { lessonx, load } = useSelector((store) => store.lessonx);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const initialFormData = {
    title: "",
    thumbnail: "",
    class: "",
    subject: "",
  };

  const questionData = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [question, setQuestion] = useState(questionData);
  const [allQuestions, setAllQuestions] = useState([]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeQuestion = (i) => {
    setAllQuestions(allQuestions.filter((elem, index) => index != i));
  };

  const submitLessonx = () => {
    for (let keys in formData) {
      if (formData[keys] == "") {
        return messageApi.open({
          type: "info",
          content: "Enter all the required fields",
          duration: 3,
        });
      }
    }

    let obj = {
      ...formData,
      questionData: allQuestions,
      totalPoint: +formData.pointPerQuestion * +formData.noOfQuestions,
      totalTime: formData.totalTime,
      creator: user.name,
    };

    console.log(obj);
    setLoading(true);
    dispatch(createLessonx(obj)).then((res) => {
      if (res.msg == "Error") {
        setLoading(false);
        messageApi.open({
          type: "info",
          content: "Error",
          duration: 3,
        });
      } else {
        setLoading(false);
        setAllQuestions([]);
        setFormData(initialFormData);
        setQuestion(questionData);
        onClose();
        return messageApi.open({
          type: "info",
          content: "Lessonx Created",
          duration: 3,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getLessonxData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="lessonsx">
        {contextHolder}
        <Header Title={"Info"} Address={"Info"} />

        <div className="homeCenter">

          {/* about us */}
          <div className="main-section">
            <div className="main-box">

              {/* about us bottom */}
            <p className="title text-white bg-customBlue w-full p-4 mx-6 rounded-md mt-6 text-md">About Me</p>
              <div className="main-center mx-6">

                {/* about us bottom salsa */}
                {/* <div
                  className="main-form"
                  data-aos="flip-left"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                  >
                  <img src={ava_salsa} alt="Salsa" />
                  <h3>Tsalsabilla Nurfitriyatna Putri</h3>
                  <h2>Fullstack Developer</h2>
                  <p>Universitas Pendidikan Indonesia</p>
                  <p>Computer Science Education</p>
                  <div className="inFlex mt-2 flex justify-center w-full cursor-pointer text-black">
                  <a  className="hover:transition hover:duration-150 hover:transform hover:translate-y-1" target="_blank" href="http://linkedin.com/in/tsalsabillanf">
                  <TiSocialLinkedinCircular className="text-gray-600 mr-4 h-8 w-6"/>
                  </a>
                  <a  className="hover:transition hover:duration-150 hover:transform hover:translate-y-1" target="_blank" href="mailto:tsalsabilla569@gmail.com">
                  <CiMail className="text-gray-600 h-8 w-6"/>
                  </a>
                  </div>
                  </div> */}
                <div className="profile-text rounded-lg px-8 py-3 w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <div className=" text-left flex flex-row">
                <div className="w-2/5 flex justify-center items-center pr-8">
                <img src={ava_yasir} alt="Salsa" />
                </div>
                <div className="w-3/5">
                <h1 className="title mt-6 text-black">Hi There! I'm Muhamad Yasirwan Dwi Cahyono</h1>
                <h1 className="font-bold pb-4 text-lg text-customBlue">Fullstack Web Developer</h1>
                <p>Experienced full-stack web developer in designing, building, and maintaining dynamic and scalable web applications. Possesses strong front-end and back-end skills, with a focus on MERN stack. Passionate about working in a collaborative and results-oriented team to create innovative and impactful digital solutions.</p>
                <table>
                  <thead>
                    <tr>
                      <th>Birthday</th>
                      <td>Mei 12, 2002</td>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th>Phone</th>
                    <td>0812 1212 1212</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>afereviewer5@upi.edu</td>
                  </tr>
                  <tr>
                    <th>From</th>
                    <td>Bandung, Indonesia</td>
                  </tr>
                  <tr>
                    <th>Languange</th>
                    <td>Indonesia, English</td>
                  </tr>
                  </tbody>
                </table>
                <a target="_blank" href="https://drive.google.com/file/d/1_xOxlyqG0c_euccaBZnFkS1IINASUuY2/view" class="rounded-md py-2 px-4 flex bg-customBlue w-1/4 items-center text-white justify-center cursor-pointer text-custom-red hover:transition hover:duration-150 hover:transform hover:translate-y-1 mt-2 mb-4 mt-4">Download CV</a>
                </div>
                </div>
                </div>
                {/* end about us bottom salsa */}
              </div>
              {/* end about us bottom */}
            </div>
          </div>
          {/* end about us */}

          {/* leaderboard */}
          <div className="credential ">
          <div className="credits" data-aos="fade-down" data-aos-delay="500">
            <h1 className="title text-white bg-customBlue w-full p-4 mx-6 rounded-md mt-6 text-md">Credit</h1>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md mx-6 p-4 mb-4">
            <p>https://youtu.be/6dAAX5B85PM?si=U5XB_9wkFiDUJipN</p>
            <p>https://youtu.be/6dAAX5B85PM?si=qJOXnETheq-cV0ZI</p>
            <p>https://youtu.be/_lxIFFLFdBk?si=LRlcpZKzra5BXHPm</p>
            <p>https://youtu.be/u5DpGWeVSG8?si=WNOhPVX0i65BcLyb</p>
            <p>https://youtu.be/5jbYsYj1-v0?si=MtlzGQZqNIQjQ4tf</p>
            <p>https://youtu.be/ZeqJewFm7zc?si=vCG3nS0Th9j3mPvc</p>
            <p>https://youtu.be/kO8iL-yR6uA?si=oHojL1qcZDs1MPzl</p>
            <p>https://youtu.be/Pzy3XWzORNw?si=KPo4ohkHO5iaIHCm</p>
            <p>https://youtu.be/uqVJc9lLknA?si=jwF0cO6rlQ9FFngt</p>
            <p>https://youtu.be/of6gKz-0nQM?si=odI7y7Ld1fKNTl5w</p>
            <p>https://youtu.be/XiRgSeKiYew?si=V7LxJ7fveivuMH1U</p>
            </div>
          </div>
          <div className="table-container" data-aos="fade-up" data-aos-delay="500">
            <div id="highScores" className="flex-center flex-column">
              <div id="userData" className="tabel"></div>
            </div>
          </div>
        <div className="homeFooter font-sans">
          Copyright © 2024 BelajarIN
        </div>
          </div>
          {/* end leaderboard */}
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
      </div>
      </Navbar>
  );
};

export default Lessonsx;
