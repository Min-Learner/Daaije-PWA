import Pirate from "../components/Pirate";
import SecondHalf from "../components/SecondHalf";
import Image from "next/image";
import Total from "../components/Total";
import { useRouter } from "next/router";
import EventDice from "../components/EventDice";
import Dices from "../components/Dices";

export default function Knight({ pirate, cardHint }) {
  let x = (pirate % 7) * 39 + 21 + "px";
  let y = (pirate % 7) % 2 ? "40%" : "0";
  let array = "大爷世界最威武".split("");
  const router = useRouter();

  return (
    <div className="container">
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
          onClick={() => router.push("/Progress")}
        >
          <Image alt="" src="/daye.png" width={35} height={35} />
        </span>
      </div>
      <p className="h-7 mt-5 font-bold text-lg">{cardHint}</p>
      <Total />
      <div className="flex justify-between relative h-[100px] w-full">
        <Dices />
        <EventDice />
      </div>
      <SecondHalf />
    </div>
  );
}
