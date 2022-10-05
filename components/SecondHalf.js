import { useState, useEffect } from "react/";
import { useAppContext } from "../utils/appContext";
import Link from "next/link";
import playAudio from "../utils/playAudio";

let timer;

export default function SecondHalf() {
  const [coolTime, setCoolTime] = useState(false);
  const {
    basicState: { startIndex, playerList, round, currentPlayer },
    basicDispatch,
    list,
    isBasic,
  } = useAppContext();

  //根据React官方文档，cleanup function不仅在unmount的时候发动，而且也会在useEffect发动的时候发动，除了第一次发动。所以setTimeOut的cleanup要放在一个空数组的useEffect里面，这样该useEffect只会发动一次，cleanup也只在unmount的时候发动；如果放在上面的useEffect中，在第2次useEffect发动的时候，cleanup也会发动，从而导致setTimeOut用不了
  useEffect(() => {
    !round &&
      currentPlayer &&
      informCurrentPlayer(`开始玩家${nameHandler(currentPlayer)}`);

    return () => clearTimeout(timer);
  }, []);

  const informCurrentPlayer = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.pitch = 1;
      speech.volume = 1;
      speech.lang = "zh-HK";
      speech.rate = 1.2;
      speechSynthesis.speak(speech);
    } else {
      !text.includes("开始玩家") && playAudio(text, true);
    }
  };

  const nameHandler = (text) => {
    const names = "高佬 老宇 老敏 霞嫂 老炜".split(" ");
    for (let name of names) {
      if (name.includes(text)) return name;
    }
    return "大爷";
  };

  const handleRoll = (isReroll) => {
    if (!coolTime) {
      const file = list && list[Math.floor(Math.random() * list.length)];
      const text =
        nameHandler(playerList[(round + startIndex) % playerList.length]) +
        "回合";
      if (isReroll) {
        basicDispatch({ type: "reroll" });
        file && playAudio(file);
      } else {
        basicDispatch({ type: "roll" });
        file && playAudio(file, false, informCurrentPlayer, text);
      }
      setCoolTime(true);
      timer = setTimeout(() => {
        setCoolTime(false);
      }, 1500);
    }
  };

  return (
    <>
      <p className="flex items-center my-4 text-xl xiaowei">
        {`第 ${round} 次，${round ? "当前玩家" : "开始玩家"}:`}
        <mark className="text-2xl font-bold px-2">{currentPlayer}</mark>
      </p>
      <i>老点大爷帅气头像摇骰子</i>
      <div
        onClick={() => handleRoll(false)}
        className={coolTime ? "animate__animated animate__rubberBand" : ""}
      >
        <img src="yyds.jpg" alt="" className="w-28 rounded-md" />
      </div>
      <div
        className={`flex justify-around w-full ${isBasic ? "my-5" : "mt-5"}`}
      >
        <Link href="/">
          <a className="btn w-20 bg-orange-400">设定</a>
        </Link>
        <button
          type="button"
          onClick={() => handleRoll(true)}
          className="btn w-20 bg-red-600"
          disabled={!round}
        >
          重摇
        </button>
        {isBasic ? null : (
          <Link href="/dice">
            <a className="btn w-20 bg-green-600">次数记录</a>
          </Link>
        )}
        <Link href="/player">
          <a className="btn w-20 bg-sky-500">玩家记录</a>
        </Link>
      </div>
    </>
  );
}
