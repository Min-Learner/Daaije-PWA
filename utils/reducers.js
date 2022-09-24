const basicInitState = {
  dieOne: 2,
  dieTwo: 3,
  round: 0,
  animation: false,
  diceData: [],
  currentPlayer: "",
  startIndex: 0,
  playerList: [],
  dieThree: 0,
  pirate: 0,
  cardInfo: "",
  progress: [],
};

const basicReducer = (state, action) => {
  const ranNumA = Math.floor(Math.random() * 6);
  const ranNumB = Math.floor(Math.random() * 6);
  const ranNumC = Math.floor(Math.random() * 6);
  const {
    round,
    diceData,
    startIndex,
    playerList,
    dieThree,
    pirate,
    progress,
  } = state;
  if (ranNumC > 2) pirate++;

  function cardHandle(eventDice, redDice) {
    const fields = ["贸易", "政治", "科技"];
    const words = `攞${fields[eventDice]}卡`;
    let list = [];

    progress.forEach((r, i) => {
      if (r[eventDice] && r[eventDice] >= redDice) list.push(playerList[i]);
    });

    if (eventDice > 2) return "无卡攞！";
    if (!list.length) return "无人可以攞卡！";
    return list.join("、") + words;
  }

  switch (action.type) {
    case "roll":
      return {
        ...state,
        dieOne: ranNumA,
        dieTwo: ranNumB,
        round: round + 1,
        diceData: [...diceData, ranNumA + ranNumB + 2],
        animation: true,
        currentPlayer: playerList[(round + startIndex) % playerList.length],
        dieThree: ranNumC,
        pirate,
        cardInfo: cardHandle(ranNumC, ranNumA),
      };
    case "reroll":
      diceData.pop();
      if (dieThree > 2) {
        pirate ? pirate-- : (pirate = 5);
      }
      return {
        ...state,
        dieOne: ranNumA,
        dieTwo: ranNumB,
        diceData: [...diceData, ranNumA + ranNumB + 2],
        animation: true,
        dieThree: ranNumC,
        pirate,
        cardInfo: cardHandle(ranNumC, ranNumA),
      };
    case "animation":
      return { ...state, animation: false };
    case "playerlist":
      return { ...state, playerList: action.payload };
    case "init":
      return { ...state, ...action.payload };
    case "increment":
      progress[action.payload[0]][action.payload[1]]++;
      return { ...state };
    case "decrement":
      progress[action.payload[0]][action.payload[1]]--;
      return { ...state };
    default:
      return state;
  }
};

export { basicInitState, basicReducer };
