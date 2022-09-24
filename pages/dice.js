import { useRouter } from "next/router";
import { useAppContext } from "../utils/appContext";

export default function Dice() {
  const {
    basicState: { diceData },
  } = useAppContext();
  const router = useRouter();

  const arr = Array(11).fill(0);
  diceData.forEach((d) => arr[d - 2]++);

  return (
    <div className="table-wrapper">
      <div className="w-11/12 relative border-b-2 border-white/50">
        <span className="absolute left-[38px] inline-block w-0.5 h-full bg-white/50"></span>
        {arr.map((data, index) => {
          return (
            <div key={index} className="h-12 flex items-center">
              <span className="text-[25px] text-white w-8 text-center mr-2">
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
      <button
        type="button"
        onClick={() => router.back()}
        className="btn w-11/12 bg-green-600 mt-3"
      >
        返回
      </button>
    </div>
  );
}
