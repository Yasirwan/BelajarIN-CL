import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Admin from "../Pages/Admin/Admin";
import Tutor from "../Pages/Tutor/Tutor";
import Student from "../Pages/Student/Student";
import Scratchs from "../Pages/Scratchs/Scratchs";
import SingleScratch from "../Pages/SingleScratch/SingleScratch";
import Lessons from "../Pages/Lessons/Lessons";
import Content from "../Pages/Contents/Content";
import Assignment from "../Pages/Assignments/Assignment";
import Test from "../Pages/Tests/Test";
import SingleContent from "../Pages/SingleContent/SingleContent";
import SingleAssignment from "../Pages/SingleAssignment/SingleAssignment";
// import SingleTest from "../Pages/SingleTest/SingleTest";
import Doubts from "../Pages/Doubts/Doubts";
import SingleDoubt from "../Pages/SingleDoubt/SingleDoubt";
import LeaderBoard from "../Pages/LeaderBoard/LeaderBoard";
import User from "../Pages/User/User";
import Quiz from "../Pages/Quiz/Quiz";
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
        <Route path="/scratch/:id" element={<SingleScratch />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/content/:id" element={<SingleContent />} />
        <Route path="/contents" element={<Content />} />
        <Route path="/assignment/:id" element={<SingleAssignment />} />
        <Route path="/assignments" element={<Assignment />} />
        {/* <Route path="/test/:id" element={<SingleTest />} /> */}
        <Route path="/tests" element={<Test />} />
        <Route path="/doubts" element={<Doubts />} />
        <Route path="/doubt/:id" element={<SingleDoubt />} />
        <Route path="*" element={<Home />} />
        <Route path="/test/:id" element={userQuiz ? <Navigate to="/user" /> : <Quiz />} />
        <Route path="/user" element={userQuiz === null ? <Navigate to="/test/:id" /> : <User />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Router;
