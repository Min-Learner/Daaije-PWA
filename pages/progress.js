import { useRouter } from "next/router";
import { useAppContext } from "../utils/appContext";

export default function Progress() {
  const router = useRouter();
  const {
    basicState: { playerList, progress },
    basicDispatch,
  } = useAppContext();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white bg-[#f45b69] py-5 px-2.5">
      <div className="flex w-full">
        <div className="flex-1 text-center py-2.5 px-1.5"></div>
        <div className="flex-1 text-center py-2.5 px-1.5 bg-[rgb(250,163,7)]">
          贸易-布
        </div>
        <div className="flex-1 text-center py-2.5 px-1.5 bg-[rgb(0,119,182)]">
          政治-币
        </div>
        <div className="flex-1 text-center py-2.5 px-1.5 bg-[rgb(64,145,108)]">
          科技-纸
        </div>
      </div>
      <div className="flex flex-col w-full">
        {playerList.map((player, index) => {
          return (
            <div key={player} className="flex w-full">
              <div
                className={`grid place-content-center flex-1 py-2.5 px-1.5 ${
                  index % 2 ? "" : "bg-white/20"
                }`}
              >
                {player}
              </div>
              {progress[index].map((d, i) => {
                return (
                  <div
                    key={i}
                    className={`flex flex-1 py-2.5 px-1.5 justify-center items-center h-14 w-full ${
                      index % 2
                        ? "even:bg-[rgba(255,255,255,.2)]"
                        : "odd:bg-[rgba(255,255,255,.2)]"
                    }`}
                  >
                    <button
                      className="text-2xl"
                      onClick={() =>
                        d > 0 &&
                        basicDispatch({
                          type: "decrement",
                          payload: [index, i],
                        })
                      }
                    >
                      -
                    </button>
                    <span className="text-2xl px-2.5">{d}</span>
                    <button
                      className="text-2xl"
                      onClick={() =>
                        d < 5 &&
                        basicDispatch({
                          type: "increment",
                          payload: [index, i],
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="btn bg-orange-700 mt-5"
        onClick={() => router.push("/basic")}
      >
        確定
      </button>
    </div>
  );
}
