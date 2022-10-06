import { useAppContext } from "../utils/appContext";
import Image from "next/image";
import Pirate from "./icons/Pirate";
import { useRouter } from "next/router";

export default function KnightHeader() {
  const {
    basicState: { pirate, cardInfo },
  } = useAppContext();
  const router = useRouter();

  let x = (pirate % 7) * 39 + 21 + "px";
  let y = (pirate % 7) % 2 ? "40%" : "0";
  const array = "大爷世界最威武".split("");

  return (
    <>
      <div className="w-[350px] flex justify-center relative">
        <div
          className="w-[35px] h-[35px] absolute bg-black text-white flex justify-center items-center left-0 border-none p-1.5 rounded-full transition-all z-50"
          style={{ transform: `translate(${x}, ${y})` }}
        >
          <Pirate />
        </div>
        {array.map((e, i) => {
          return (
            <span
              key={i}
              className="odd:translate-y-[40%] border-2 w-[35px] h-[35px] mx-0.5 rounded-full flex justify-center items-center"
            >
              {e}
            </span>
          );
        })}
        <span
          className="translate-y-[40%] w-[35px] h-[35px] mx-0.5 rounded-full flex justify-center items-center"
          onClick={() => router.push("/progress")}
        >
          <Image alt="daaije" src="/daye.png" width={35} height={35} />
        </span>
      </div>
      <p className="h-7 mt-5 font-bold text-lg font-serif">{cardInfo}</p>
    </>
  );
}
