import { useRouter } from "next/router";
import { useState, useEffect } from "react/";
import { useAppContext } from "../utils/appContext";
import useDownload from "../utils/useDownload";
import playAudio from "../utils/playAudio";

let timer;

export default function SecondHalf() {
  const [coolTime, setCoolTime] = useState(false);
  const router = useRouter();
  const list = useDownload();
  const {
    basicState: { animation, round, currentPlayer },
    basicDispatch,
  } = useAppContext();

  useEffect(() => {
    !currentPlayer && router.push("/");
  }, []);

  useEffect(() => {
    list &&
      animation &&
      playAudio(list[Math.floor(Math.random() * list.length)]);
  }, [animation]);

  //根据React官方文档，cleanup function不仅在unmount的时候发动，而且也会在useEffect发动的时候发动，除了第一次发动。所以setTimeOut的cleanup要放在一个空数组的useEffect里面，这样该useEffect只会发动一次，cleanup也只在unmount的时候发动；如果放在上面的useEffect中，在第2次useEffect发动的时候，cleanup也会发动，从而导致setTimeOut用不了
  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (!coolTime) {
      basicDispatch({ type: "roll" });
      setCoolTime(true);
      timer = setTimeout(() => {
        setCoolTime(false);
      }, 2000);
    }
  };

  return (
    <>
      <p className="flex items-center my-4 text-xl">
        {`第 ${round} 次，${round ? "当前玩家" : "开始玩家"}:`}
        <mark className="text-2xl font-bold px-2">{currentPlayer}</mark>
      </p>
      <i>老点大爷帅气头像摇骰子</i>
      <div
        onClick={handleClick}
        className={animation ? "animate__animated animate__rubberBand" : ""}
      >
        <img src="yyds.jpg" alt="" className="w-28 rounded-md" />
      </div>
      <div className="flex justify-around w-full mt-5">
        <button
          onClick={() => router.push("/")}
          className="btn w-20 bg-orange-400"
        >
          设定
        </button>
        <button
          onClick={() => basicDispatch({ type: "reroll" })}
          className="btn w-20 bg-red-600"
          disabled={!round}
        >
          重摇
        </button>
        <button
          onClick={() => router.push("/dice")}
          className="btn w-20 bg-green-700"
        >
          次数记录
        </button>
        <button
          onClick={() => router.push("/player")}
          className="btn w-20 bg-sky-600"
        >
          玩家记录
        </button>
      </div>
    </>
  );
}
