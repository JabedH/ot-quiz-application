import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startQuiz } from "../redux/action/quizAction";
const Start = () => {
  const dispatch = useDispatch();
  // const {time} = useSelector(state => state.quizReducer)
  const [minute, setMinute] = useState(1);
  const [second, setSecond] = useState(0);
  const [time, setTime] = useState(60);
  const handleQuizStart = () => {
    dispatch(startQuiz(time));
  };
  useEffect(() => {
    if (minute > 59) {
      setMinute(1);
    }
    if (second > 59) {
      setSecond(1);
    }
  }, [minute, second]);
  useEffect(() => {
    console.log(minute);
    console.log(typeof minute);
    if (minute !== NaN && second !== NaN) {
      setTime(minute * 60 + second);
    }
  }, [minute, second]);
  return (
    <div className="startBox lg:min-h-full pt-10">
      <div className="w-[400px] shadow-lg bg-white p-20 rounded-md">
        <div className="text-black">
          <h1 className="font-bold text-2xl">Start the Quiz</h1>
          <p>Good luck!</p>
          <p>Time:&nbsp;&nbsp;{time}sec</p>
          <section>
            <label htmlFor="">
              <input
                type="number"
                className=" w-10 mr-2 bg-slate-300"
                value={minute}
                onChange={(e) => setMinute(parseInt(e.target.value))}
              />
              min
            </label>
            <label htmlFor="">
              <input
                type="number"
                className=" w-10 mx-2 bg-slate-300"
                value={second}
                onChange={(e) => setSecond(parseInt(e.target.value))}
              />
              sec
            </label>
          </section>
          <button className="btn mt-5" onClick={handleQuizStart}>
            START
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
