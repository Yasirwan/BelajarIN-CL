import React, { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTestData } from "../../Redux/test/action";
import { saveTestResult } from "../../Redux/testresult/action";

import axios from "axios";
import QuizContext from "../../contexts/QuizContext";
import Spiner from "../../Components/Spiner/Spiner";

//component imports
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

//css imports
// import "./Quiz.css";
import BackendURL from "../../BackendURL";
import heroImage from '/img/hero2.png';


const Quiz = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: { isAuthenticated, token },
  } = useSelector((store) => store.auth);

  const { singleTest } = useSelector((store) => store.test);

  const [selectedOptions, setSelectedOptions] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [saveQuiz] = useState([]);
  let { score, setScore } = useContext(QuizContext);
  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [isSelected, setIsSelected] = useState(false);
  let [selectedOption, setSelectedOption] = useState(null);
  let [option, setOption] = useState("");
  let [label] = useState(["A", "B", "C", "D", "E"]);
  let [progressBarWidth, setProgressBarWidth] = useState(0);
  let API_URL = `${BackendURL}/test/api/quiz/js`;

  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  useEffect(() => {
    dispatch(getSingleTestData(params.id));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await axios.get(API_URL);
        let quizShuffle = data.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 20);
        setQuestions(quizShuffle);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions();
  }, [setQuestions]);

  const handleSubmitQuiz = async () => {
    handleNextQuestion(questions[currentQuestion]);

    const data = {
      payload: {
        testId: singleTest._id,
        score: score,
      }, 
      token
    };

    dispatch(saveTestResult(data))
      .then((res) => {
        if (res.code === 200) {
          window.location.href = "/user";
        }
      })
      .catch((error) => {
      console.log(error);
      });
  };  

  let [numberProgressComp] = useState([
    {
      component: (
        <>
          <span className="connector block w-4 h-0 bg-pink-500"></span>
          <span className="number bg-pink-500 text-sm text-gray-200 h-6 flex justify-center items-center rounded-full w-6">
            {currentQuestion + 1}
          </span>
        </>
      ),
    },
  ]);

  const handleOption = (index, option, question, e) => {
    const updatedSelectedOptions = { ...selectedOptions };
    updatedSelectedOptions[currentQuestion] = option.option;
    setSelectedOptions(updatedSelectedOptions);
    setIsSelected(!isSelected);
    setSelectedOption(option.option);
    if (e.target === e.currentTarget) {
      if (!isSelected) {
        e.target.classList.remove("shadow-option");
      } else {
        e.target.classList.add("shadow-option");
      }
    }
    setOption(option.option);
  };  

  const handleNextQuestion = (question) => {
    setCurrentQuestion(currentQuestion + 1);
    setProgressBarWidth(progressBarWidth + 5);
    numberProgressComp.push({
      component: (
        <>
          <span className="connector block w-4 h-[1px] bg-pink-500"></span>
          <span className="number bg-pink-500 text-sm text-gray-200 h-6 flex justify-center items-center rounded-full w-6">
            {numberProgressComp.length + 1}
          </span>
        </>
      ),
    });
    if (option === question.correctAnswer) {
      setScore(score + 1);
    }
    if (isSelected) {
      setIsSelected(false);
    }
    if (!option) {
      saveQuiz.push({
        ...question,
        userAnswer: false,
        selected: false,
        attempt: false,
      });
    } else {
      saveQuiz.push({
        ...question,
        userAnswer: option,
        selected: true,
        attempt: true,
      });
    }

    setOption("");
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    setProgressBarWidth(progressBarWidth - 5);
    const prevSelectedOption = selectedOptions[currentQuestion - 1];
    setSelectedOption(prevSelectedOption);
    numberProgressComp.pop();
  };

  return (
    <Navbar>
      <div className="singleTest">

        {/* <div className="singleTestData">
          <div className="fileContainer">
            {singleTest?.fileType === "jpg" || singleTest?.fileType === "jpeg" || singleTest?.fileType === "png" ? (
              <img src={singleTest.fileUrl} alt="" />
            ) : (
              <video
                allow="fullscreen"
                frameBorder="0"
                width="100%"
                controls
                controlsList="nodownload"
              >
                <source src={singleTest.fileUrl} />
              </video>
            )}
          </div>
        </div>
        <div className="singleTestDetails">
          <p>{singleTest?.title}</p>
          <p>Class : {singleTest?.class}</p>
          <p>{singleTest?.subject}</p>
        </div> */}

<div class="m-6 p-4 ">
          <div class="container mx-auto px-2 py-4 flex flex-row items-center justify-center">
            <div class="flex flex-col md:flex-row md:items-center"> 
              <div class="overview-left mr-4 md:mr-8">
                <img class="md:w-48" src={heroImage} alt="Hero Image"/>
              </div>
            </div>

            <div class="overview-right ml-4 md:ml-8">
              <div class="container mx-auto">
                <h1 class="text-xl font-bold mb-2">Soal Pretest Algoritma Dan Pemrograman SMKN 4 Padalarang</h1>
                <div class="flex flex-col items-start">
                  <p class="text-gray-600 mb-4">
                  Mohon isi formulir ini dengan baik dan benar.  Setiap jawaban tidak akan dimasukkan ke dalam nilai.
Terima kasih dan Selamat mengerjakan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="singleContentDetails border-solid border-2 border-gray-300">
          <h3 className="text-black font-bold text-center">Form Pretest</h3>
        </div>

        <div className="singleContentDetails ">

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 ">
          <div class="flex items-center justify-center">
            <span className="p-1">Silahkan klik  </span><a target="_blank" href="https://forms.gle/tWGPM7uH3yjheY2y6" class="inline-block font-medium hover:font-semibold focus:font-semibold  ">Start</a><span className="p-1"> untuk memulai test</span>
          </div>
        </div>
      </div>
    </div>

        {/* <div className="quiz-wrapper w-full min-h-[100vh]">
          <div className="md:relative quiz-content h-full col-span-2">
            {isLoading ? (
              <Spiner />
            ) : (
              <div className="py-6">
                <div className="quiz h-full md:px-16 px-8 flex gap-4 flex-col justify-center">
                  <div className="max-md:flex hidden">
                    <div className="bar shadow-inner w-full bg-gray-100 flex border rounded-3xl">
                      <div
                        className={`progress w-[${progressBarWidth}%] shadow-sm rounded-3xl bg-pink-500`}
                      ></div>
                    </div>
                    <span className="text-gray-500 ml-1">
                      {progressBarWidth}%
                    </span>
                  </div>
                  <div className="relative question-number md:flex hidden mb-8">
                    {questions.map((question, index) => (
                      <div
                        className={`disabled flex items-center q-${index + 1}`}
                        key={index}
                      >
                        <span className="connector block w-4 h-[1px] bg-gray-200"></span>
                        <span className="number bg-gray-200 text-sm text-gray-500 h-6 flex justify-center items-center rounded-full w-6">
                          {index + 1}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center absolute left-0">
                      {numberProgressComp.map((comp, index) => (
                        <React.Fragment key={index}>
                          {comp.component}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="question">
                    <h1 className="md:text-3xl flex text-gray-500 font-bold leading-[1.6] mb-4">
                      <span className=""></span>{" "}
                      {questions[currentQuestion].question}
                    </h1>
                    {questions[currentQuestion].imageUrl && (
                      <img
                        src={questions[currentQuestion].imageUrl}
                        alt="Question Image"
                        className="object-contain max-h-96 w-full mb-4"
                      />
                    )}
                  </div>
                  <div className="options flex flex-col gap-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <div className="option flex gap-4 items-center" key={index}>
                        <div className="p-2 bg-pink-50 text-gray-600 border-2 font-bold border-pink-100 w-10 flex justify-center items-center rounded-full h-10">
                          {label[index]}
                        </div>
                        <div
                          className={`option w-full relative z-10 py-2 cursor-pointer border-2 border-gray-100 rounded-md bg-gray-50 ${
                            selectedOption === option.text || selectedOption === option.imageUrl ? "shadow-option after:content-['✓'] after:text-white after:absolute after:right-6 after:top-[50%] after:-translate-y-[50%] after:w-6 after:h-6 after:rounded-full after:flex after:justify-center after:items-center after:bg-pink-500" : ""
                          }`}
                          onClick={(e) => handleOption(index, option, questions[currentQuestion], e)}
                        >
                          <span className="relative -z-10 pl-4" onClick={(e) => handleOption(index, option, questions[currentQuestion], e)}>
                            {option.text}
                            {option.imageUrl && (
                              <img
                                src={option.imageUrl}
                                alt={`Option Image ${index}`}
                                className="object-contain max-h-72 w-full mb-4 py-2 cursor-pointer rounded-md"
                                onClick={(e) => handleOption(index, option, questions[currentQuestion], e)}
                              />
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="footer">
                    <div className="progress">
                      <div className="progress-bar"></div>
                    </div>
                    <div className="buttons flex justify-end gap-2">
                      {currentQuestion >= 4 ? (
                        <>
                          <button
                            onClick={() => handlePreviousQuestion()}
                            className="bg-blue-500 shadow-lg uppercase w-24 text-white rounded-sm px-4 py-2"
                          >
                            Back
                          </button>
                          <button
                            onClick={handleSubmitQuiz}
                            className="bg-customBlue shadow-lg uppercase w-24 text-white rounded-sm px-4 py-2"
                          >
                            Submit
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handlePreviousQuestion()}
                            className="bg-blue-500 shadow-lg uppercase w-24 text-white rounded-sm px-4 py-2"
                          >
                            Back
                          </button>
                          <button
                            onClick={() => handleNextQuestion(questions[currentQuestion])}
                            className="bg-green-500 shadow-lg uppercase w-24 text-white rounded-sm px-4 py-2"
                          >
                            Next
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </Navbar>
  );
};

export default Quiz;