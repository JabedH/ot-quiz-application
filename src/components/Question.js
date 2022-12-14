import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  nextQuiz,
  prevQuiz,
  submitQuiz,
  timeOut,
} from "../redux/action/quizAction";
import quizData from "../data/quiz.json";

const Question = () => {
  const dispatch = useDispatch();
  const { activeQuestion, answers, time } = useSelector(
    (state) => state?.quizReducer
  );
  const [data, setData] = useState(quizData?.data[activeQuestion]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("");
  const [timer, setTimer] = useState(time);
  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      dispatch(timeOut());
    }
  }, [timer]);
  const radiosWrapper = useRef();
  useEffect(() => {
    setData(quizData?.data[activeQuestion]);
    if (answers[activeQuestion] != undefined) {
      setSelected(answers[activeQuestion].a);
      console.log("RUn once");
    }
  }, [data, activeQuestion]);
  const changeHandler = (e) => {
    setSelected(e.target.value);
    if (error) {
      setError("");
    }
  };
  const handlePrev = () => {
    setError("");
    dispatch(prevQuiz());
  };
  const handleNext = (e) => {
    if (selected === "") {
      return setError("Please select one option!");
    }
    let ans = [...answers];
    ans[activeQuestion] = {
      q: data.question,
      a: selected,
    };
    dispatch(
      nextQuiz({
        answers: ans,
      })
    );
    setSelected("");
    const findCheckedInput =
      radiosWrapper.current.querySelector("input:checked");
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  };
  const handleSubmit = () => {
    if (selected === "") {
      return setError("Please select one option!");
    }
    dispatch(
      submitQuiz({
        answers: [
          ...answers,
          (answers[activeQuestion] = {
            q: data.question,
            a: selected,
          }),
        ],
        time: time - timer,
      })
    );
  };
  return (
    <div className="mx-5">
      <section>
        <div>
          <div className="grid grid-cols-1 text-center">
            <div className="flex justify-center my-14">
              <p className="font-bold text-2xl text-center w-[500px]">
                {data?.question}
              </p>
            </div>
          </div>
          <div>
            <div className="grid justify-center gap-5">
              <div className="flex justify-between">
                <h3>
                  Question {activeQuestion + 1}/{quizData?.data.length}
                </h3>
                <h5>Time: {timer}</h5>
              </div>
              {data?.choices.map((choice, i) => (
                <div>
                  <div
                    className={`${
                      choice === selected ? `bg-[#94d6a3]` : `bg-[#d0d2d6]`
                    } w-96 flex p-4 rounded`}
                  >
                    <label key={i}>
                      <input
                        type="checkbox"
                        name="answer"
                        value={choice}
                        onChange={changeHandler}
                        checked={choice === selected}
                        className="checkbox checkbox-md border-2 rounded-none border-[#4c5a9e] mr-3"
                      />
                    </label>

                    <h3 className="text-start font-bold text-[#21338a] ">
                      {choice}
                    </h3>
                  </div>
                </div>
              ))}
              <section className="flex  justify-between">
                {activeQuestion <= 0 ? null : (
                  <button className="btn" onClick={handlePrev}>
                    Prev
                  </button>
                )}

                {activeQuestion + 1 >= quizData?.data.length ? (
                  <button className="btn" onClick={handleSubmit}>
                    Submit
                  </button>
                ) : (
                  <button className="btn" onClick={handleNext}>
                    Next
                  </button>
                )}
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Question;
