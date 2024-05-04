import React, { useEffect, useState } from "react";
import "./Lessons.css";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import AddIcon from "../../Components/AddIcon/AddIcon";
import Lesson from "../../Components/Lesson/Lesson";
import { Button, Drawer, Space, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createLesson, getLessonData } from "../../Redux/lesson/action";
import { useNavigate } from "react-router-dom";
import deleteImage from '/img/deletec.png';

const Lessons = () => {
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
  const { lesson, load } = useSelector((store) => store.lesson);

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
    // noOfQuestions: "",
    // pointPerQuestion: "",
    // negativeMarking: "No",
    // negativeMarkingPerQuestion: "No",
    // totalTime: "",
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

  // const handleQuestionChange = (e) => {
  //   setQuestion({ ...question, [e.target.name]: e.target.value });
  // };

  // const addQuestion = (e) => {
  //   e.preventDefault();
  //   if (formData.noOfQuestions == "") {
  //     return messageApi.open({
  //       type: "info",
  //       content: "Please enter the no.of questions value above",
  //       duration: 3,
  //     });
  //   }
  //   if (formData.noOfQuestions <= allQuestions.length) {
  //     return messageApi.open({
  //       type: "info",
  //       content: "You already added required no.of questions",
  //       duration: 3,
  //     });
  //   }
  //   setAllQuestions([...allQuestions, question]);
  //   setQuestion(questionData);
  // };

  const removeQuestion = (i) => {
    setAllQuestions(allQuestions.filter((elem, index) => index != i));
  };

  const submitLesson = () => {
    for (let keys in formData) {
      if (formData[keys] == "") {
        return messageApi.open({
          type: "info",
          content: "Enter all the required fields",
          duration: 3,
        });
      }
    }
    // if (allQuestions.length === 0) {
    //   return messageApi.open({
    //     type: "info",
    //     content: "No questions were entered",
    //     duration: 3,
    //   });
    // }
    // if (formData.noOfQuestions > allQuestions.length) {
    //   return messageApi.open({
    //     type: "info",
    //     content: `You only added ${allQuestions.length} out of ${formData.noOfQuestions} questions`,
    //     duration: 3,
    //   });
    // }
    // if (formData.noOfQuestions < allQuestions.length) {
    //   return messageApi.open({
    //     type: "info",
    //     content: `You have added more than ${formData.noOfQuestions} questions, Please remove some questions`,
    //     duration: 3,
    //   });
    // }

    let obj = {
      ...formData,
      questionData: allQuestions,
      totalPoint: +formData.pointPerQuestion * +formData.noOfQuestions,
      totalTime: formData.totalTime,
      creator: user.name,
    };

    console.log(obj);
    setLoading(true);
    dispatch(createLesson(obj)).then((res) => {
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
          content: "Lesson Created",
          duration: 3,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getLessonData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="lessons">
        {contextHolder}
        <Header Title={"Lesson"} Address={"Lesson"} />
        <div className="lessonData">
          {lesson?.map((data, i) => {
            return <Lesson data={data} key={i} />;
          })}
        </div>
        {user?.userType !== "Student" ? (
          <div onClick={showDrawer}>
            <AddIcon />
          </div>
        ) : (
          ""
        )}
        <Drawer
          title="Create Lesson"
          width={520}
          closable={false}
          onClose={onClose}
          open={open}
          extra={
            <Space>
               {/* <Button onClick={onClose}>X</Button> */}
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
              placeholder="Lesson Thumbnail"
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Pdf file"
              type="text"
              name="class"
              value={formData.class}
              onChange={(e) => handleFormChange(e)}
            />
          </form>
          <br></br>
          <button className="Submit" onClick={() => submitLesson()}>
            Add Lesson
          </button>

          <Drawer
            title="Lesson Questions"
            width={320}
            closable={false}
            onClose={onChildrenDrawerClose}
            open={childrenDrawer}
          >
            <p>Number of questions required : {formData.noOfQuestions || 0} </p>
            {allQuestions.length == 0 ? (
              <p>No questions added yet.</p>
            ) : (
              allQuestions?.map((ques, i) => {
                return (
                  <div key={i} className="questionDiv">
                    <h4>
                      {i + 1} .{ques.question}
                    </h4>
                    <p>a. {ques.option1}</p>
                    <p>b. {ques.option2}</p>
                    <p>c. {ques.option3}</p>
                    <p>d. {ques.option4}</p>
                    <p>e. {ques.option5}</p>
                    <button onClick={() => removeQuestion(i)}><img src={deleteImage}/></button>
                  </div>
                );
              })
            )}
          </Drawer>
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

export default Lessons;
