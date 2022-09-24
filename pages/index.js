import { useRouter } from "next/router";
import { useAppContext } from "../utils/appContext";
import { useState, useEffect } from "react";
import FancyHeader from "../components/fancyHeader";

export default function Home() {
  const router = useRouter();
  const {
    basicState: { playerList },
    isBasic,
    setIsBasic,
    basicDispatch,
  } = useAppContext();
  const players = ["仲", "高", "宇", "敏", "霞", "炜"];
  const [playerSlect, setPlayerSlect] = useState(players);

  useEffect(() => {
    basicDispatch({ type: "init", payload: { playerList: [] } });
  }, []);

  const playerSelectHandler = (e) => {
    let array = [];
    for (let i = 0; i < playerSlect.length; i++) {
      if (playerSlect[i] !== e) array.push(playerSlect[i]);
    }
    setPlayerSlect(array);
    basicDispatch({
      type: "playerlist",
      payload: [...playerList, e],
    });
  };

  const setGame = () => {
    const randomNumber = Math.floor(Math.random() * playerList.length);
    const randomStartPlayer = playerList[randomNumber];

    if (playerList.length) {
      router.push("/basic");
      basicDispatch({
        type: "init",
        payload: {
          round: 0,
          startIndex: randomNumber,
          currentPlayer: randomStartPlayer,
          diceData: [],
          pirate: 0,
          cardInfo: "大爷世界最威武！",
          progress: Array.from(new Array(playerList.length), () => {
            return [0, 0, 0];
          }),
        },
      });
    }
  };

  const reset = () => {
    setPlayerSlect(players);
    basicDispatch({ type: "playerlist", payload: [] });
  };

  return (
    <>
      <div className="flex items-center min-h-screen flex-col">
        <FancyHeader />
        <p className="text-xl my-5 animate__animated animate__fadeInDown">
          按座位顺序选择玩家
        </p>
        <div className="w-full animate__animated animate__delay-1s animate__fadeIn flex justify-around h-9">
          {playerSlect.map((player) => {
            return (
              <p
                key={player}
                className="w-9 h-9 rounded-full bg-red-500 text-xl grid place-content-center text-white"
                onClick={() => playerSelectHandler(player)}
              >
                {player}
              </p>
            );
          })}
        </div>
        <p className="text-xl my-5 animate__animated animate__fadeInUp">
          系统将随机选择开始玩家
        </p>
        <div className="w-full flex justify-around h-9">
          {playerList.map((player) => {
            return (
              <p
                key={player}
                className="w-9 h-9 rounded-full bg-red-500 text-xl grid place-content-center text-white"
              >
                {player}
              </p>
            );
          })}
        </div>
        <div className="w-full my-5 flex justify-center items-center">
          <p className="text-lg">选择游戏模式: </p>
          <button
            type="button"
            className={`text-lg ml-2.5 px-2 py-1 border-2 border-black ${
              isBasic ? "text-white bg-black" : ""
            }`}
            onClick={() => setIsBasic(true)}
          >
            基本包
          </button>
          <button
            type="button"
            className={`text-lg ml-2.5 px-2 py-1 border-2 border-black ${
              isBasic ? "" : "text-white bg-black"
            }`}
            onClick={() => setIsBasic(false)}
          >
            騎士包
          </button>
        </div>
        <div className="flex justify-around w-full">
          <button
            type="button"
            className="btn w-20 bg-green-600"
            onClick={setGame}
          >
            确定
          </button>
          <button
            type="button"
            className="btn w-20 bg-teal-700"
            onClick={reset}
          >
            重置
          </button>
          <button
            type="button"
            className="btn w-20 bg-amber-500"
            onClick={() => router.push("/list")}
          >
            音频列表
          </button>
          <button
            type="button"
            className="btn w-20 bg-sky-500"
            onClick={() => router.push("/test")}
          >
            测试
          </button>
        </div>
      </div>
    </>
  );
}
