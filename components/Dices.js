import { useAppContext } from "../pages/_app";
import Dice from "./Dice";

export default function Dices() {
  const { dieOne, dieTwo } = useAppContext();

  return (
    <>
      <Dice dice={dieTwo} which={"second"} />
      <Dice dice={dieOne} which={"first"} />
    </>
  );
}
