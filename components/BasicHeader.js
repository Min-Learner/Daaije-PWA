import Typed from "typed.js";
import { useRef, useEffect } from "react";
import Image from "next/image";

export default function BasicHeader() {
  const el = useRef();
  const quotes = [
    "你疴屎揼到屌啊",
    "我错屌去嗲",
    "你又老閪我，让你又无知道",
    "逗逗你嗻啊",
    "我终于觉得有啲啲仔意思嗲",
    "你知唔知呢半个钟我点过㗎",
    "去到菉塘，记得揇虾酱哇",
    "做咩屌嗰，竟然畀仲哥赢",
    "我就最屌听仲哥个话噶",
    "佢叫我揇虾酱",
    "我绝对无敢揇豉油",
    "垃圾游戏，都无好撩嗰",
    "冧斜嗰肥佬真真无死得落着",
    "压三家，标准玩法啊",
  ];

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: quotes,
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 500,
      smartBackspace: true,
      loop: true,
      showCursor: false,
    });

    return () => typed.destroy();
  }, []);

  return (
    <div className="flex items-center">
      <span className="h-7 text-xl font-bold font-serif" ref={el}></span>
      <div className="flex">
        <Image src={"/daye.png"} alt="daaije" width={35} height={35} />
      </div>
    </div>
  );
}
