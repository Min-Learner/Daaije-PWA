// import Typed from "typed.js";
// import { useRef, useEffect } from "react";
import Image from "next/image";

import Bird from "./bird";

// export default function BasicHeader() {
//   const el = useRef();
//   const quotes = [
//     "你疴屎揼到屌啊",
//     "我错屌去嗲",
//     "你又老閪我，让你又无知道",
//     "逗逗你嗻啊",
//     "我终于觉得有啲啲仔意思嗲",
//     "你知唔知呢半个钟我点过㗎",
//     "去到菉塘，记得揇虾酱哇",
//     "做咩屌嗰，竟然畀仲哥赢",
//     "我就最屌听仲哥个话噶",
//     "佢叫我揇虾酱",
//     "我绝对无敢揇豉油",
//     "垃圾游戏，都无好撩嗰",
//     "冧斜嗰肥佬真真无死得落着",
//     "压三家，标准玩法啊",
//   ];

//   useEffect(() => {
//     const typed = new Typed(el.current, {
//       strings: quotes,
//       startDelay: 300,
//       typeSpeed: 100,
//       backSpeed: 50,
//       backDelay: 500,
//       smartBackspace: true,
//       loop: true,
//       showCursor: false,
//     });

//     return () => typed.destroy();
//   }, []);

//   return (
//     <div className="flex items-center">
//       <span className="h-7 text-xl font-bold font-serif" ref={el}></span>
//       <div className="flex">
//         <Image src={"/daye.png"} alt="daaije" width={35} height={35} />
//       </div>
//     </div>
//   );
// }

export default function BasicHeader() {
  return (
    <div className="w-full bg-gradient-to-b from-cyan-500 to-blue-500">
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
