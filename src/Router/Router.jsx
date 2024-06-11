import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Admin from "../Pages/Admin/Admin";
import Tutor from "../Pages/Tutor/Tutor";
import Student from "../Pages/Student/Student";
import Scratchs from "../Pages/Scratchs/Scratchs";
import Scratchs2 from "../Pages/Scratchs/Scratchs2";
import Scratchs3 from "../Pages/Scratchs/Scratchs3";
import SingleScratch from "../Pages/SingleScratch/SingleScratch";
import Lessons from "../Pages/Lessons/Lessons";
import Lessonsx from "../Pages/Lessons/Lessonsx";
import Content from "../Pages/Contents/Content";
import Content2 from "../Pages/Contents/Content2";
import Content3 from "../Pages/Contents/Content3";
import Assignment from "../Pages/Assignments/Assignment";
import Test from "../Pages/Tests/Test";
import SingleContent from "../Pages/SingleContent/SingleContent";
import SingleAssignment from "../Pages/SingleAssignment/SingleAssignment";
// import SingleTest from "../Pages/SingleTest/SingleTest";
import Doubts from "../Pages/Doubts/Doubts";
import Doubts2 from "../Pages/Doubts/Doubts2";
import Doubts3 from "../Pages/Doubts/Doubts3";
import SingleDoubt from "../Pages/SingleDoubt/SingleDoubt";
import SingleDoubt2 from "../Pages/SingleDoubt/SingleDoubt2";
import SingleDoubt3 from "../Pages/SingleDoubt/SingleDoubt3";
import LeaderBoard from "../Pages/LeaderBoard/LeaderBoard";
import User from "../Pages/User/User";
import Quiz from "../Pages/Quiz/Quiz";
import Quiz2 from "../Pages/Quiz/Quiz2"
import { useContext } from "react";
import QuizContext from "../contexts/QuizContext"
import Register from "../Pages/Register/Register";

const Router = () => {
  const { userQuiz } = useContext(QuizContext)
  console.log(userQuiz)
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/student" element={<Student />} />
        <Route path="/scratchs" element={<Scratchs />} />
        <Route path="/scratchs2" element={<Scratchs2 />} />
        <Route path="/scratchs3" element={<Scratchs3 />} />
        <Route path="/scratch/:id" element={<SingleScratch />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessonsx" element={<Lessonsx />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/content/:id" element={<SingleContent />} />
        <Route path="/contents" element={<Content />} />
        {/* <Route path="/content2/:id" element={<SingleContent2 />} /> */}
        <Route path="/contents2" element={<Content2 />} />
        {/* <Route path="/content3/:id" element={<SingleContent3 />} /> */}
        <Route path="/contents3" element={<Content3 />} />
        <Route path="/assignment/:id" element={<SingleAssignment />} />
        <Route path="/assignments" element={<Assignment />} />
        {/* <Route path="/test/:id" element={<SingleTest />} /> */}
        <Route path="/tests" element={<Test />} />
        <Route path="/doubts" element={<Doubts />} />
        <Route path="/doubts2" element={<Doubts2 />} />
        <Route path="/doubts3" element={<Doubts3 />} />
        <Route path="/doubt/:id" element={<SingleDoubt />} />
        <Route path="/doubt2/:id" element={<SingleDoubt2 />} />
        <Route path="/doubt3/:id" element={<SingleDoubt3 />} />
        <Route path="*" element={<Home />} />
        <Route path="/test/:id" element={userQuiz ? <Navigate to="/user" /> : <Quiz />} />
        <Route path="/user" element={userQuiz === null ? <Navigate to="/test/:id" /> : <User />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Router;
