import { useAppContext } from "../utils/appContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SecondHalf from "../components/SecondHalf";
import Total from "../components/Total";
import Dice from "../components/Dice";
import EventDice from "../components/EventDice";
import BasicHeader from "../components/BasicHeader";
import KnightHeader from "../components/KnightHeader";

export default function Basic() {
  const {
    basicState: { dieOne, dieTwo, currentPlayer },
    isBasic,
  } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    !currentPlayer && router.push("/");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {isBasic ? <BasicHeader /> : <KnightHeader />}
      <Total />
      <div
        className={`flex justify-around h-[100px] ${
          isBasic ? "w-72" : "w-full"
        }`}
      >
        <Dice dice={dieTwo} which={"second"} />
        <Dice dice={dieOne} which={"first"} />
        {isBasic ? null : <EventDice />}
      </div>
      <SecondHalf />
    </div>
  );
}
