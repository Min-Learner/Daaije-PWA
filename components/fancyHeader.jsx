import { useEffect, useState } from "react";
import Knife from "../public/knife";

let smallInterval, bgInterval, colorChangeInterval;

export default function FancyHeader() {
  const [isSmall, setIsSmall] = useState(true);
  const [bgChange, setBgChange] = useState(true);
  const [order, setOrder] = useState(0);
  const [color, setColor] = useState(true);
  const [step, setStep] = useState(3);
  const daaije = "大爷超级无敌世界最威武".split("");

  useEffect(() => {
    smallInterval = setInterval(() => {
      setIsSmall((prev) => !prev);
    }, 500);
    bgInterval = setInterval(() => {
      setBgChange((prev) => !prev);
      setOrder((prev) => (prev + 1) % 11);
      setStep((prev) => (prev + 1) % 4);
    }, 300);
    colorChangeInterval = setInterval(() => {
      setColor((prev) => !prev);
    }, 150);

    return () => {
      clearInterval(smallInterval);
      clearInterval(bgInterval);
      clearInterval(colorChangeInterval);
    };
  }, []);

  function textAnimate(step) {
    switch (step) {
      case 0:
        return <First />;
      case 1:
        return (
          <>
            <First />
            <Second />
          </>
        );
      case 2:
        return (
          <>
            <First />
            <Second />
            <Third />
          </>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <p
        className={`${
          color ? "bg-pink-500" : "bg-yellow-500"
        } text-lg w-full flex justify-around py-2`}
      >
        {daaije.map((l, i) => {
          return (
            <span
              key={l}
              className={`inline-block ${
                order === i ? "scale-150 text-white" : ""
              }`}
            >
              {l}
            </span>
          );
        })}
      </p>
      <div className="flex w-full">
        <p className="flex text-lg bg-black text-white p-2">
          仲哥何B
          <span
            className={`grid place-content-center w-12 text-yellow-400 ${
              isSmall ? "scale-75" : "scale-125"
            }`}
          >
            {isSmall ? "可小" : "可大"}
          </span>
        </p>
        <p className="text-white bg-red-500 text-2xl flex-1 flex justify-around items-center">
          <span
            className={bgChange ? "bg-white text-red-500 rounded px-1" : ""}
          >
            仲哥威武
          </span>
          <span
            className={bgChange ? "" : "bg-white text-red-500 rounded px-1"}
          >
            马哥霸气
          </span>
        </p>
      </div>
      <div className="flex items-center bg-green-700 w-full py-2">
        <p
          className={`text-2xl flex-1 text-center text-amber-300 ${
            color ? "translate-x-4" : ""
          }`}
        >
          无割我条屌啊！
        </p>
        <span
          className={`inline-block pr-1 w-8 ${color ? "" : "translate-y-2"}`}
        >
          <Knife />
        </span>
        <p className={`text-xl text-rose-300 mr-4 ${color ? "" : "rotate-6"}`}>
          割马哥屌啊
        </p>
      </div>
      <p className="bg-blue-800 w-full h-12 pl-5 flex items-center text-white">
        <span
          className={`py-0.5 px-2 mr-2 text-lg inline-block ${
            color ? "bg-red-600 text-yellow-400" : "bg-yellow-500 text-black"
          }`}
        >
          据砖家研究发现
        </span>
        信仲哥可以
        {textAnimate(step)}
      </p>
    </>
  );
}

const First = () => {
  return <span className="text-lg text-yellow-300 ml-1">得</span>;
};
const Second = () => {
  return <span className="text-xl text-yellow-300 mx-2">永</span>;
};
const Third = () => {
  return <span className="text-2xl text-yellow-300">生</span>;
};
