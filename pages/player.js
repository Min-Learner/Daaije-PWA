import { useEffect, useRef } from "react";
import Link from "next/link";
import { useAppContext } from "../utils/appContext";

export default function Player() {
  const target = useRef();
  const {
    basicState: { diceData, startIndex, playerList },
  } = useAppContext();

  useEffect(() => {
    target.current.scrollIntoView();
  }, []);

  return (
    <div className="wrapper">
      <table className="w-11/12 text-center text-2xl text-white">
        <thead>
          <tr className="h-12 bg-violet-600 font-serif">
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
      <Link href="/basic">
        <a
          ref={target}
          className="w-11/12 text-center rounded bg-green-600 text-white text-xl py-1 mt-3"
        >
          返 回
        </a>
      </Link>
    </div>
  );
}
