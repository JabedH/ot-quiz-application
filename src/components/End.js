import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../redux/action/quizAction";
import { formatTime } from "../utils";
import quizData from "../data/quiz.json";
import Modal from "./Modal";
import Trophy from "../assets/images/trophy.png";

const End = () => {
  const dispatch = useDispatch();
  const { answers, time } = useSelector((state) => state.quizReducer);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    let correct = 0;
    answers.forEach((result, index) => {
      if (result.a === quizData?.data[index].answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
  }, []);
  const handleReset = () => {
    dispatch(resetQuiz());
  };
  return (
    <div className="startBox lg:min-h-full pt-10">
      <div className="w-[400px] shadow-lg bg-white p-20 rounded-md">
        <div className="text-black">
          <div className="flex justify-center">
            <img src={Trophy} className="trophy w-20" alt="" srcset="" />
          </div>
          <h3 className="font-bold text-2xl">Your results</h3>
          <p className="text-xl">
            {correctAnswers} of {quizData?.data.length}
          </p>
          <p>
            <strong>
              {Math.floor((correctAnswers / quizData?.data.length) * 100)}%
            </strong>
          </p>
          <p>
            <strong>Your time:</strong> {time}sec
          </p>
          <section className="mt-5">
            <label htmlFor="my-modal-3" className="btn modal-button">
              Check your answers
            </label>
            <button
              className="btn mt-5"
              style={{ marginLeft: "20px" }}
              onClick={handleReset}
            >
              Try again
            </button>
          </section>

          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <section className="text-start">
                <p className="text-black">Your Answers</p>
                <section>
                  <ul>
                    {answers.map((result, i) => (
                      <li key={i} className="mb-6">
                        <p className="text-black">
                          <strong>{result.q}</strong>
                        </p>
                        <p
                          className={
                            result.a === quizData?.data[i].answer
                              ? " bg-green-500"
                              : "bg-red-400"
                          }
                        >
                          Your answer: {result.a}
                        </p>
                        {result.a !== quizData?.data[i].answer && (
                          <p className=" bg-orange-400">
                            Correct answer: {quizData?.data[i].answer}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default End;
