// import { useContext } from "react";
// import QuizContext from "../../contexts/QuizContext";

// //component imports
// import Navbar from "../../Components/Sidebar/Navbar";
// import Header from "../../Components/Header/Header";

// const User = () => {
//   const { userQuiz } = useContext(QuizContext);
//   const score = userQuiz.filter((quiz) => {
//     return quiz.userAnswer === quiz.correctAnswer;
//   });
//   const handleRetakeQuiz = (e) => {
//     e.preventDefault();
//     localStorage.removeItem("quiz");
//     window.location.replace("/");
//   };
  
// // Fungsi untuk mengubah indeks menjadi huruf abjad
// const indexToLetter = (index) => {
//   const letters = ['a', 'b', 'c', 'd', 'e'];
//   return letters[index];
// };

//   return (
//     <Navbar>
//     <>
//     <Header Title={"Test"} Address={"Tests"} />
//       <div className="">
//         <div className="relative">
//           <div className="header p-2 shadow-lg sm:px-16 px-4 flex justify-between items-center text-white bg-green-500">
//             <h1 className="sm:text-2xl text-lg">
//               <span className="font-bold">
//                 {score.length >= 10 ? "Good Job:" : "Opps! try again:"}
//               </span>{" "}
//               <span className="text-gray-200">
//                 You score is {score.length} of {userQuiz.length}
//               </span>
//             </h1>
//           </div>
//           <button
//             onClick={handleRetakeQuiz}
//             className="fixed bottom-6 z-20 right-6 shadow-xl w-24 h-24 text-gray-100 px-4 py-2 bg-red-500 rounded-full flex justify-center items-center"
//           >
//             Retake Quiz
//           </button>
//           <div className="indicators flex justify-center items-center gap-2 mt-8">
//             <div className="flex justify-center items-center"><span className="w-4 h-4 flex rounded-full bg-green-200 mr-2"></span> Correct</div>
//             <div className="flex justify-center items-center"><span className="w-4 h-4 block rounded-full bg-red-200 mr-2"></span> Incorrect</div>
//             <div className="flex justify-center items-center"><span className="w-4 h-4 block rounded-full bg-yellow-200 mr-2"></span> Unattempted</div>
//           </div>
//           <div className="py-8 flex flex-col gap-4">
//             {userQuiz &&
//               userQuiz.map((question, index) => {
//                 return (
//                   <div className="sm:w-[75%] px-4 m-auto" key={index}>
//                     <div>
//                       <h1 className="sm:text-2xl text-lg font-bold mb-4 text-gray-600 flex">
//                         <span className="mr-2">{index + 1}.</span>{" "}
//                         <span>{question.question}</span>
//                       </h1>
//                       {/* Tampilkan gambar pertanyaan jika ada */}
//                       {question.imageUrl && (
//                         <img
//                           src={question.imageUrl}
//                           alt="Question Image"
//                           className="object-contain max-h-96 w-full mb-4"
//                         />
//                       )}
//                     </div>
//                     <div className="options">
//                       {question.options.map((option, index) => {
//                         return (
//                           <div
//                             className="option flex gap-2 my-2 items-center"
//                             key={index}
//                           >
//                             <div className="p-2 bg-green-50 text-gray-600 border-2 font-bold border-green-100 w-10 flex justify-center items-center rounded-full h-10">
//                               {indexToLetter(index)}
//                             </div>
//                             <div
//                               className={`option w-full relative z-10 py-2 border-2 border-gray-100 rounded-md                              
//                               ${
//                                 question.attempt === false &&
//                                 question.correctAnswer === option
//                                   ? "bg-yellow-200"
//                                   : ""
//                               }
//                               ${
//                                 question.correctAnswer == option
//                                   ? "bg-green-200"
//                                   : "bg-gray-50"
//                               } ${
//                                 question.userAnswer != question.correctAnswer &&
//                                 question.userAnswer == option
//                                   ? "bg-red-200"
//                                   : "bg-gray-50"
//                               }`}
//                             >
//                               <span className="relative -z-10 pl-4">
//                                 {option}
//                               </span>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 );
//               })}
//           </div>
//         </div>
//       </div>
//     </>
//     </Navbar>
//   );
// };

// export default User;

import React, { useState, useContext } from "react";
import QuizContext from "../../contexts/QuizContext";

const User = () => {
  const { userQuiz } = useContext(QuizContext);
  const score = userQuiz.filter((quiz) => {
    return quiz.userAnswer === quiz.correctAnswer;
  });
  const handleRetakeQuiz = (e) => {
    e.preventDefault();
    localStorage.removeItem("quiz");
    window.location.replace("/");
  };

  let [label] = useState(["A", "B", "C", "D", "E"]);

  return (
    <>
      <div className="">
        <div className="relative">
          <div className="header p-2 shadow-lg sm:px-16 px-4 flex justify-between items-center text-white bg-pink-500">
            <h1 className="sm:text-2xl text-lg">
              <span className="font-bold">
                {score.length >= 10 ? "Good Job:" : "Opps! try again:"}
              </span>{" "}
              <span className="text-gray-200">
                You score is {score.length} of {userQuiz.length}
              </span>
            </h1>
          </div>
          <button
            onClick={handleRetakeQuiz}
            className="fixed bottom-6 z-20 right-6 shadow-xl w-24 h-24 text-gray-100 px-4 py-2 bg-red-500 rounded-full flex justify-center items-center"
          >
            Retake Quiz
          </button>
          <div className="indicators flex justify-center items-center gap-2 mt-8">
            <div className="flex justify-center items-center"><span className="w-4 h-4 flex rounded-full bg-green-200 mr-2"></span> Correct</div>
            <div className="flex justify-center items-center"><span className="w-4 h-4 block rounded-full bg-red-200 mr-2"></span> Incorrect</div>
            <div className="flex justify-center items-center"><span className="w-4 h-4 block rounded-full bg-yellow-200 mr-2"></span> Unattempted</div>
          </div>
          <div className="py-8 flex flex-col gap-4">
            {userQuiz &&
              userQuiz.map((question, index) => {
                return (
                  <div className="sm:w-[75%] px-4 m-auto" key={index}>
                    <div>
                      <h1 className="sm:text-2xl text-lg font-bold mb-4 text-gray-600 flex">
                        <span className="mr-2">{index + 1}.</span>{" "}
                        <span>{question.question}</span>
                      </h1>
                      {question.imageUrl && (
                        <img
                          src={question.imageUrl}
                          alt="Question Image"
                          className="object-contain max-h-96 w-full mb-4"
                        />
                      )}
                    </div>
                    <div className="options">
                      {question.options.map((option, index) => {
                        return (
                          <div
                            className="option flex gap-2 my-2 items-center"
                            key={index}
                          >
                            <div className="p-2 bg-pink-50 text-gray-600 border-2 font-bold border-pink-100 w-10 flex justify-center items-center rounded-full h-10">
                              {/* {index + 1} */}
                              {label[index]}
                            </div>
                            <div
                              className={`option w-full relative z-10 py-2 border-2 border-gray-100 rounded-md                              
                              ${
                                question.attempt === false &&
                                question.correctAnswer === option
                                  ? "bg-yellow-200"
                                  : ""
                              }
                              ${
                                question.correctAnswer == option
                                  ? "bg-green-200"
                                  : "bg-gray-50"
                              } ${
                                question.userAnswer != question.correctAnswer &&
                                question.userAnswer == option
                                  ? "bg-red-200"
                                  : "bg-gray-50"
                              }`}
                            >
                              <span className="relative -z-10 pl-4">
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
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;