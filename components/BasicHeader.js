import { useState } from "react";
import Image from "next/image";

import Bird from "./icons/bird";

export default function BasicHeader() {
  const [showAd, setShowAd] = useState(true);

  return (
    <>
      {!showAd ? (
        <Ad callback={setShowAd} />
      ) : (
        <div className="flex items-center" onClick={() => setShowAd(false)}>
          <p
            className="text-3xl mr-2"
            style={{ fontFamily: "ZCOOL KuaiLe, sans-serif" }}
          >
            睇男科，找仲哥
          </p>
          <Image src={"/daye.png"} alt="daaije" width={35} height={35} />
        </div>
      )}
    </>
  );
}

function Ad({ callback }) {
  return (
    <div className="w-full bg-gradient-to-b from-cyan-500 to-blue-500 relative">
      <button
        type="button"
        className="absolute top-2 right-2 text-white"
        onClick={() => callback(true)}
      >
        X
      </button>
      <div className="flex justify-around items-center text-white mt-3">
        <div className="flex items-center">
          <span className="w-12 mr-2">
            <Bird />
          </span>
          <div>
            <p className="text-xl">湛江圣育强医疗</p>
            <p className="text-xs text-center italic">电话: 0123-456-789</p>
          </div>
        </div>
        <div className="flex self-stretch">
          <p className="text-yellow-400 text-lg mt-auto mb-1">男科诊疗中心</p>
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
        <ul className="text-white text-lg grid grid-cols-2">
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
      <p className="text-xl text-center py-1 text-white my-1">
        -- 地址：<span className="italic">湛江市舞仁区沿山大道67号</span> --
      </p>
    </div>
  );
}
