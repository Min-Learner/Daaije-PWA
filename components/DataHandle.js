export default function DataHandle({ field, setField, index, data, dice }) {
  let dataHandle = (or, index) => {
    let clone = [...field]; //关键一步，不解构复制的话，React视原state没有发生变化！！
    if (or && clone[index] < 5) clone[index]++;
    if (!or && clone[index] > 0) clone[index]--;
    setField(clone);
  };

  return (
    <div
      className={`flex justify-center items-center h-14 w-full ${
        dice % 2
          ? "even:bg-[rgba(255,255,255,.2)]"
          : "odd:bg-[rgba(255,255,255,.2)]"
      }`}
    >
      <button className="text-2xl" onClick={() => dataHandle(false, index)}>
        -
      </button>
      <span className="text-2xl px-2.5">{data}</span>
      <button className="text-2xl" onClick={() => dataHandle(true, index)}>
        +
      </button>
    </div>
  );
}
