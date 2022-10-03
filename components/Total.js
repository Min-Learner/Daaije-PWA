import { useAppContext } from "../utils/appContext";

export default function Total() {
  const {
    basicState: { dieOne, dieTwo },
  } = useAppContext();

  const creatNumbers = () => {
    let array = [];
    for (let i = 2; i < 13; i++) {
      array.push(i);
    }
    return array;
  };

  return (
    <div className="flex">
      <div className="w-9 flex items-center justify-center text-5xl">
        {dieOne + dieTwo !== 0 ? "≮" : null}
      </div>
      <div className="w-[120px] h-[150px] mx-6 overflow-hidden">
        <div
          className="flex transition-all"
          style={{ transform: `translateX(-${(dieOne + dieTwo) * 120}px)` }}
        >
          {creatNumbers().map((n) => {
            return (
              <span
                className="text-[100px] text-center flex-none w-[120px] leading-[150px]"
                key={n}
              >
                {n}
              </span>
            );
          })}
        </div>
      </div>
      <div className="w-9 flex items-center justify-center text-5xl">
        {dieOne + dieTwo !== 10 ? "≯" : null}
      </div>
    </div>
  );
}
