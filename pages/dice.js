import { useAppContext } from "../utils/appContext";
import Link from "next/link";

export default function Dice() {
  const {
    basicState: { diceData },
  } = useAppContext();

  const arr = Array(11).fill(0);
  diceData.forEach((d) => arr[d - 2]++);

  return (
    <div className="wrapper">
      <div className="w-11/12 relative border-b-2 border-white/50">
        <span className="absolute left-[38px] inline-block w-0.5 h-full bg-white/50"></span>
        {arr.map((data, index) => {
          return (
            <div key={index} className="h-12 flex items-center">
              <span className="text-[25px] text-white w-8 text-center mr-2 xiaowei">
                {index + 2}
              </span>
              <span
                className="text-right pr-1 text-xl bg-amber-400"
                style={{ width: (data / Math.max(...arr)) * 280 + "px" }}
              >
                {data ? data : null}
              </span>
            </div>
          );
        })}
      </div>
      <Link href="/basic">
        <a className="w-11/12 text-center rounded bg-green-600 text-white text-xl mt-3 py-1">
          返 回
        </a>
      </Link>
    </div>
  );
}
