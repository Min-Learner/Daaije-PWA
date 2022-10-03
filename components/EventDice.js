import Politic from "./icons/Politic";
import Science from "./icons/Science";
import Skull from "./icons/Skull";
import Trade from "./icons/Trade";
import { useAppContext } from "../utils/appContext";

export default function EventDice() {
  const {
    basicState: { animation, dieThree },
  } = useAppContext();

  return (
    <div
      className={`w-[100px] ${
        animation ? "animate__wobble animate__animated animate__faster" : ""
      }`}
    >
      <div
        className={
          dieThree > 2
            ? "w-[100px] h-[100px] rounded-xl p-2.5 border-2 border-black"
            : "hidden"
        }
      >
        <Skull />
      </div>
      <div
        className={
          dieThree === 0
            ? "w-[100px] h-[100px] rounded-xl p-2.5 border-2 border-black"
            : "hidden"
        }
      >
        <Trade />
      </div>
      <div
        className={
          dieThree === 1
            ? "w-[100px] h-[100px] rounded-xl p-2.5 border-2 border-black"
            : "hidden"
        }
      >
        <Politic />
      </div>
      <div
        className={
          dieThree === 2
            ? "w-[100px] h-[100px] rounded-xl p-2.5 border-2 border-black"
            : "hidden"
        }
      >
        <Science />
      </div>
    </div>
  );
}
