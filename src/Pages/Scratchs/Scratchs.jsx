import React, { useEffect, useState } from "react";
import "./Scratchs.css";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import AddIcon from "../../Components/AddIcon/AddIcon";
import Scratch from "../../Components/Scratch/Scratch";
import { Button, Drawer, Space, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createScratch, getScratchData } from "../../Redux/scratch/action";
import { useNavigate } from "react-router-dom";
import deleteImage from '/img/deletec.png';
import heroImage from '/img/hero2.png';

const Scratchs = () => {
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
  const { scratch, load } = useSelector((store) => store.scratch);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // const showChildrenDrawer = () => {
  //   setChildrenDrawer(true);
  // };

  // const onChildrenDrawerClose = () => {
  //   setChildrenDrawer(false);
  // };

  const initialFormData = {
    title: "",
    thumbnail: "",
    // class: "",
    subject: "",
    noOfQuestions: "",
    pointPerQuestion: "",
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

  // const removeQuestion = (i) => {
  //   setAllQuestions(allQuestions.filter((elem, index) => index != i));
  // };

  const submitScratch = () => {
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
    //     content: You only added ${allQuestions.length} out of ${formData.noOfQuestions} questions,
    //     duration: 3,
    //   });
    // }
    // if (formData.noOfQuestions < allQuestions.length) {
    //   return messageApi.open({
    //     type: "info",
    //     content: You have added more than ${formData.noOfQuestions} questions, Please remove some questions,
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
    dispatch(createScratch(obj)).then((res) => {
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
          content: "Scratch Created",
          duration: 3,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getScratchData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="scratchs">
        {contextHolder}
        <Header Title={"Session 2"} Address={"Session 2"} />
        {/* <div className="scratchData">
          {scratch?.map((data, i) => {
            return <Scratch data={data} key={i} />;
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
      <h1 class="text-xl font-bold mb-2">Siap menguji kemampuanmu di sesi kedua?</h1>
      <div class="flex flex-col items-start">
        <p class="text-gray-600 mb-4">
          Kerjakan kuis evaluasi dan buktikan seberapa jago kamu!<br/>
          Masukkan skor yang kamu dapatkan<br/>
          Jangan lupa screenshot hasil skor kamu dan kirimkan sebagai bukti! Pastikan screenshot menunjukkan username dan skor kamu
        </p>
      </div>
    </div>
  </div>
</div>
</div>

<div className="scratchResponses bg-customBlue rounded-lg p-4 my-2">
          <h3 className="text-white font-bold text-center">Quizziz</h3>
        </div>

        <div class="mx-auto w-full max-w-screen-xl">
          <div class="relative" style={{ paddingTop: "75%" }}>
            <iframe src="https://quizizz.com/join?gc=75446451" allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>
        </div>

        {/* <div className="scratchResponses bg-customBlue rounded-lg p-4 my-2">
          <h3 className="text-white font-bold text-center">Form Pengumpulan</h3>
        </div>

        <div className="scratchResponses">
          <form className="responseForm flex flex-col" onSubmit={(e) => handleSubmit(e)}>
              <input
                  name="desc"
                  className="mb-2 max-w-md mx-auto border-customBlue"
                  // value={desc}
                  // onChange={(e) => setDesc(e.target.value)}
                  placeholder="Link gdrive screenshoot"
              />
              <input
                  name="numberInput"
                  type="number"
                  className="mb-2 max-w-md mx-auto border-customBlue"
                  // value={numberValue}
                  // onChange={(e) => setNumberValue(e.target.value)}
                  placeholder="Input score"
              />
              <input type="submit" className="bg-customBlue hover:bg-customBlue text-white py-2 px-4 rounded-2xl border-none max-w-md mx-auto" />
          </form>
      </div> */}


        {user?.userType !== "Student" ? (
          <div onClick={showDrawer}>
            <AddIcon />
          </div>
        ) : (
          ""
        )}
        <Drawer
          title="Create Scratch"
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
              placeholder="Scratch Thumbnail"
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
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
            </select> */}
            <input
              placeholder="No.of Questions"
              type="number"
              name="noOfQuestions"
              value={formData.noOfQuestions}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Points per question"
              type="number"
              name="pointPerQuestion"
              value={formData.pointPerQuestion}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Total points"
              value={`Total Points : ${
                formData.noOfQuestions * formData.pointPerQuestion
              }`}
              name="totalPoints"
              onChange={(e) => handleFormChange(e)}
            />
            {/* <select
              name="negativeMarking"
              onChange={(e) => handleFormChange(e)}
            >
              <option value="">Negative Marking</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {formData.negativeMarking === "Yes" ? (
              <input
                placeholder="Negative marking per question"
                type="number"
                name="negativeMarkingPerQuestion"
                value={formData.negativeMarkingPerQuestion}
                onChange={(e) => handleFormChange(e)}
              />
            ) : (
              ""
            )}
            <input
              placeholder="Total time in Minutes"
              type="number"
              name="totalTime"
              value={formData.totalTime}
              onChange={(e) => handleFormChange(e)}
            /> */}
          </form>
          {/* <form onSubmit={(e) => addQuestion(e)}>
            <label>Question</label>
            <input
              required
              placeholder="Enter question"
              type="text"
              name="question"
              value={question.question}
              onChange={(e) => handleQuestionChange(e)}
            />
            <label>Options</label>
            <input
              required
              placeholder="Enter Option 1"
              type="text"
              name="option1"
              value={question.option1}
              onChange={(e) => handleQuestionChange(e)}
            />
            <input
              required
              placeholder="Enter Option 2"
              type="text"
              name="option2"
              value={question.option2}
              onChange={(e) => handleQuestionChange(e)}
            />
            <input
              required
              placeholder="Enter Option 3"
              type="text"
              name="option3"
              value={question.option3}
              onChange={(e) => handleQuestionChange(e)}
            />
            <input
              required
              placeholder="Enter Option 4"
              type="text"
              name="option4"
              value={question.option4}
              onChange={(e) => handleQuestionChange(e)}
            />
            <input
              required
              placeholder="Enter Option 5"
              type="text"
              name="option5"
              value={question.option5}
              onChange={(e) => handleQuestionChange(e)}
            />
            <input
              type="Submit"
              value="Save"
              onChange={() => console.log("Question added")}
            />
          </form> */}
          {/* <button className="Review" onClick={showChildrenDrawer}>
            Review
          </button>
          <br></br> */}
          <button className="Submit" onClick={() => submitScratch()}>
            Add Scratch
          </button>

          {/* <Drawer
            title="Scratch Questions"
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
          </Drawer> */}
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
         <div>
            {/* <iframe src="https://scratch.mit.edu/projects/36385774/embed" allowtransparency="true" width="100%"
            height="800px" frameBorder="0" scrolling="yes" allowFullScreen></iframe> */}
        </div>
      </div>
    </Navbar>
  );
};

export default Scratchs;