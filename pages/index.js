import Text from "../components/Text";
import { useRouter } from "next/router";
import Line from "../components/Line";

export default function Home({
  playerSlect,
  playerList,
  playerSelectHandler,
  set,
  reset,
  isBasic,
  setIsBasic,
}) {
  const router = useRouter();

  return (
    <>
      <div className="bg-[#f45b69] flex justify-center items-center min-h-screen flex-col">
        <div className="relative w-full flex justify-center items-center py-[15px]">
          <div className="w-[90%] absolute fill-white animate__animated animate__zoomIn animate__delay-3s">
            <Line />
          </div>
          <div className="animate__animated animate__hinge animate__delay-1s w-[80%]">
            <Text />
          </div>
        </div>
        <p className="text-white text-xl animate__animated animate__bounceInLeft">
          按座位顺序选择玩家
        </p>
        <div className="w-full flex justify-around my-[15px] h-[35px]">
          {playerSlect.map((player) => {
            return (
              <p
                key={player}
                className="w-9 h-9 rounded-full bg-white text-2xl flex justify-center items-center"
                onClick={() => playerSelectHandler(player)}
              >
                {player}
              </p>
            );
          })}
        </div>
        <p className="text-white text-xl animate__animated animate__bounceInRight">
          系统将随机选择开始玩家
        </p>
        <div className="w-full flex justify-around my-[15px] h-[35px]">
          {playerList.map((player) => {
            return (
              <p
                key={player}
                className="w-9 h-9 rounded-full bg-white text-2xl flex justify-center items-center"
              >
                {player}
              </p>
            );
          })}
        </div>
        <div className="w-full flex justify-center items-center">
          <p className="text-lg text-white">选择游戏模式: </p>
          <button
            type="button"
            className={`bg-white text-lg ml-2.5 px-2 py-1 ${
              isBasic ? "text-white bg-gray-800" : ""
            }`}
            onClick={() => setIsBasic(true)}
          >
            基本包
          </button>
          <button
            type="button"
            className={`bg-white text-lg ml-2.5 px-2 py-1 ${
              isBasic ? "" : "text-white bg-gray-800"
            }`}
            onClick={() => setIsBasic(false)}
          >
            騎士包
          </button>
        </div>
        <div className="flex justify-around w-[95%] mt-5">
          <button type="button" className="btn bg-green-500" onClick={set}>
            确定
          </button>
          <button type="button" className="btn bg-orange-500" onClick={reset}>
            重置
          </button>
          <button
            type="button"
            className="btn bg-amber-500"
            onClick={() => router.push("/List")}
          >
            台词列表
          </button>
          <button
            type="button"
            className="btn bg-sky-500"
            onClick={() => router.push("/")}
          >
            测试
          </button>
        </div>
      </div>
    </>
  );
}
