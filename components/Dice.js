import { useAppContext } from "../pages/_app";

export default function Dice({ which, dice }) {
  const { animation } = useAppContext();

  return (
    <div className={animation ? "shake" : ""}>
      <div className={dice === 5 ? which + " dice six" : "hidden"}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={dice === 4 ? which + " dice five" : "hidden"}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={dice === 3 ? which + " dice four" : "hidden"}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={dice === 2 ? which + " dice three" : "hidden"}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={dice === 1 ? which + " dice two" : "hidden"}>
        <span></span>
        <span></span>
      </div>
      <div className={dice === 0 ? which + " dice one" : "hidden"}>
        <span></span>
      </div>
    </div>
  );
}
