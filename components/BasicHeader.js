import { useAppContext } from "../utils/appContext";
import Image from "next/image";
import Bird from "./icons/bird";

export default function BasicHeader() {
  const {
    basicState: { diceData },
  } = useAppContext();

  const arr = Array(11).fill(0);
  diceData.forEach((d) => arr[d - 2]++);
  const copy = [...arr].reverse();

  return (
    <>
      <div className="flex justify-around w-full text-xl">
        <div className="flex-1 bg-teal-500 text-white">
          {arr.map((d, i) => {
            return (
              <>
                {i > 4 ? null : (
                  <p className="flex justify-around py-1.5">
                    <b className="xiaowei w-6 text-center">{i + 2}</b>
                    <span>:</span>
                    <span className="w-14 text-right">
                      {d}
                      <sub> 次</sub>
                    </span>
                  </p>
                )}
              </>
            );
          })}
        </div>
        <div className="flex-1 bg-sky-500 text-white">
          {copy.map((d, i) => {
            return (
              <>
                {i > 4 ? null : (
                  <p className="flex justify-around py-1.5">
                    <b className="xiaowei w-6 text-center">{12 - i}</b>
                    <span>:</span>
                    <span className="w-14 text-right">
                      {d}
                      <sub> 次</sub>
                    </span>
                  </p>
                )}
              </>
            );
          })}
        </div>
      </div>
      <p className="w-full bg-amber-500 text-white text-xl flex justify-around py-1.5">
        <b className="xiaowei w-6 text-center">7</b>
        <span>:</span>
        <span className="w-14 text-right">
          {arr[5]}
          <sub> 次</sub>
        </span>
      </p>
    </>
  );
}

function Ad() {
  return (
    <div className="w-full bg-gradient-to-b from-cyan-500 to-blue-500 relative">
      <div className="flex justify-around items-center text-white mt-3">
        <div className="flex items-center">
          <span className="w-12 mr-2">
            <Bird />
          </span>
          <div>
            <p className="text-xl">湛江圣育强医疗</p>
            <p className="text-xs italic">电话: 0123-456-789</p>
          </div>
        </div>
        <div className="flex self-stretch">
          <p className="text-yellow-400 text-xl mt-auto mb-1">男科诊疗中心</p>
        </div>
      </div>
      <div className="w-full text-orange-300 my-4">
        <p
          className="text-3xl text-center"
          style={{
            textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
          }}
        >
          专业<span className="text-4xl">男</span>科 专业为
          <span className="text-4xl">男</span>人
        </p>
        <div className="border-2 border-white bg-orange-400 w-9/12 rounded my-1 mx-auto h-2"></div>
        <p
          className="text-xs text-center"
          style={{
            textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
          }}
        >
          Professional achievements in male health
        </p>
        <p
          className="text-right text-black pr-5"
          style={{
            textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
          }}
        >
          权威专家 领先技术 维护隐私
        </p>
      </div>
      <div className="flex justify-center items-center">
        <ul className="text-white text-xl grid grid-cols-2">
          <li>◎前列腺</li>
          <li>◎性功能障碍</li>
          <li>◎生殖感染</li>
          <li>◎生殖整形</li>
          <li>◎男性不育</li>
          <li>◎泌尿外科</li>
        </ul>
        <div className="ml-5">
          <Image src={"/daye.png"} alt="daaije" width={90} height={90} />
        </div>
      </div>
      <hr />
      {/* <p className="text-xl py-1 text-white my-1">
        -- 地址：<span className="italic">湛江市舞仁区沿山大道67号</span> --
      </p> */}
    </div>
  );
}
