import { useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Test() {
  const [result, setResult] = useState(Array(11).fill(0));
  const [times, setTimes] = useState(10000);
  const timesRef = useRef(10000);
  const router = useRouter();

  const testProbability = (t) => {
    let count = 0;
    let array = Array(11).fill(0);
    while (count < t) {
      const diceA = Math.floor(Math.random() * 6 + 1);
      const diceB = Math.floor(Math.random() * 6 + 1);
      array[diceA + diceB - 2]++;
      count++;
    }
    setResult(array);
    timesRef.current = times;
  };

  const handleInput = (e) => {
    const input = e.target.value;
    if (!Number.isInteger(input) && input > 0) {
      setTimes(input);
    }
  };

  return (
    <div className="table-wrapper">
      <div className="w-11/12 flex items-center flex-col justify-center rounded p-3 bg-white">
        <p className="text-base">输入整数，默认10000</p>
        <input
          className="my-2 pl-2 text-xl border outline-none rounded w-full text-center"
          type="number"
          onChange={(e) => handleInput(e)}
        />
        <button
          className="w-full rounded bg-blue-500 text-white text-xl py-1"
          type="button"
          onClick={() => testProbability(times)}
        >
          确 定
        </button>
      </div>
      <div className="w-11/12 my-2 flex items-center flex-col justify-center rounded p-3 bg-white">
        <div className="w-full border py-2">
          <span className="w-2/12 inline-block text-center">数字</span>
          <span className="w-5/12 inline-block text-center border-x">次数</span>
          <span className="w-5/12 inline-block text-center">比例</span>
        </div>
        {result.map((n, i) => {
          return (
            <div className="w-full border-b py-2" key={i}>
              <span className="w-2/12 inline-block text-center">
                <b className="text-xl">{i + 2}</b>
              </span>
              <span className="w-5/12 inline-block text-center border-x text-xl">
                {n}
              </span>
              <span className="w-5/12 inline-block text-center">
                <i className="text-xl">{(n * 100) / timesRef.current}%</i>
              </span>
            </div>
          );
        })}
      </div>
      <button
        className="w-11/12 rounded bg-green-600 text-white text-xl py-1"
        type="button"
        onClick={() => router.push("/")}
      >
        返 回
      </button>
    </div>
  );
}