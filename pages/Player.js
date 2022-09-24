import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../utils/appContext";

export default function Player() {
  const target = useRef();
  const router = useRouter();
  const {
    basicState: { diceData, startIndex, playerList },
  } = useAppContext();

  useEffect(() => {
    target.current.scrollIntoView();
  }, []);

  return (
    <div className="table-wrapper">
      <table className="w-11/12 text-center text-2xl text-white">
        <thead>
          <tr className="h-12 bg-violet-600">
            <th>次数</th>
            <th>玩家</th>
            <th>点数</th>
          </tr>
        </thead>
        <tbody>
          {diceData.map((data, index) => {
            return (
              <tr key={index} className="h-10 even:bg-white/30">
                <td>{index + 1}</td>
                <td>{playerList[(index + startIndex) % playerList.length]}</td>
                <td>{data}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        ref={target}
        onClick={() => router.back()}
        className="btn w-11/12 bg-green-600 mt-3"
      >
        返回
      </button>
    </div>
  );
}
