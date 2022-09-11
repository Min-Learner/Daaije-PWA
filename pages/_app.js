import "../styles/globals.css";
import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import wakeLock from "../utils/wakeLock";
import { supabase } from "../utils/sbClient";
import "animate.css";

function MyApp({ Component, pageProps }) {
  let players = ["仲", "高", "宇", "敏", "霞", "炜"];
  let [playerSlect, setPlayerSlect] = useState(players);
  let [playerList, setPlayerList] = useState([]);
  let [dieOne, setDieOne] = useState(2);
  let [dieTwo, setDieTwo] = useState(3);
  let [dieThree, setDiceThree] = useState(0);
  let [round, setRound] = useState(0);
  let [currentPlayer, setCurrentPlayer] = useState();
  let [animation, setAnimation] = useState(false);
  let [diceData, setDiceData] = useState([]);
  let [isBasic, setIsBasic] = useState(true);
  let [pirate, setPirate] = useState(0);
  let [trade, setTrade] = useState([]);
  let [politic, setPolitic] = useState([]);
  let [science, setScience] = useState([]);
  let [cardHint, setCardHint] = useState("");
  let [startIndex, setStartIndex] = useState();
  let [list, setList] = useState([]);
  let [darr, setDarr] = useState([0, 10]);
  const router = useRouter();
  const AppContext = createContext();
  const { acquireLock, handleVisibilityChange } = wakeLock();

  useEffect(() => {
    acquireLock();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (!list.length) {
      (async function () {
        const { data, error } = await supabase.storage.from("audios").list();
        if (error) console.log(error);
        else setList(data);
      })();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
    }, 600);
  }, [animation]);

  let playerSelectHandler = (e) => {
    let array = [];
    let clone = playerList;

    clone.push(e);

    for (let i = 0; i < playerSlect.length; i++) {
      if (playerSlect[i] !== e) array.push(playerSlect[i]);
    }

    setPlayerSlect(array);
    setPlayerList(clone);
  };

  let reset = () => {
    setPlayerList([]);
    setPlayerSlect(players);
  };

  let set = () => {
    let randomStartNumber = creatRandomNumber(playerList.length);
    let randomStartPlayer = playerList[randomStartNumber];

    if (playerList.length) {
      if (isBasic) {
        router.push("/Main");
      } else {
        router.push("/Knight");
        initKnight(playerList.length);
      }

      setRound(0);
      setStartIndex(randomStartNumber);
      setCurrentPlayer(randomStartPlayer);
      setDiceData([]);
    }
  };

  let roll = (re) => {
    let dataClone = diceData;
    let ra = creatRandomNumber(6);
    let rb = creatRandomNumber(6);

    if (re) {
      dataClone.pop();
    } else {
      setRound((pre) => pre + 1);
      setCurrentPlayer(
        playerList[(round + startIndex + 1) % playerList.length]
      );
    }

    dataClone.push(ra + rb + 2);
    playAudio(ra, rb);
    setDiceData(dataClone);
    setDieOne(ra);
    setDieTwo(rb);
    setAnimation(true);

    if (!isBasic) {
      let rc = creatRandomNumber(6);

      if (dieThree < 3 && re) {
        pirate ? setPirate((pre) => pre - 1) : setPirate(5);
      }

      handdleDiceThree(rc, ra);
      setDiceThree(rc);
    }
  };

  let cardHandle = (field, which, dice) => {
    let copy = [...field];
    let list = [];
    let words = "攞" + which + "卡";

    for (let i = 0; i < copy.length; i++) {
      if (copy[i] !== 0 && copy[i] >= dice) list.push(playerList[i]);
    }

    if (!list.length) setCardHint("无人可以攞卡！");
    else {
      words = list.join("、") + words;
      setCardHint(words);
    }
  };

  let handdleDiceThree = (rc, ra) => {
    switch (rc) {
      case 3:
        cardHandle(trade, "贸易", ra);
        break;
      case 4:
        cardHandle(politic, "政治", ra);
        break;
      case 5:
        cardHandle(science, "科技", ra);
        break;
      default:
        setPirate((pre) => pre + 1);
        setCardHint("无卡攞！");
        break;
    }
  };

  let initKnight = (length) => {
    let defaultArray = Array(length).fill(0);
    setPirate(0);
    setTrade(defaultArray);
    setPolitic(defaultArray);
    setScience(defaultArray);
  };

  let creatRandomNumber = (n) => Math.floor(Math.random() * n);

  let playAudio = (a, b) => {
    let audio = list[creatRandomNumber(list.length)];
    if (audio) {
      let line = new Audio(
        `https://daaije-server.herokuapp.com/uploads/${audio}`
      );
      let daaije =
        Math.random() > 0.5 ? "/music/yyds.m4a" : "/music/daaije.m4a";
      let sound = new Audio(daaije);

      if (darr.indexOf(a + b) > -1) sound.play();
      else line.play();
    }
  };

  return (
    <AppContext.Provider
      value={{
        animation,
        dieOne,
        dieTwo,
        dieThree,
        setCurrentPlayer,
        roll,
        round,
        currentPlayer,
      }}
    >
      <Layout>
        <Component
          darr={darr}
          setDarr={setDarr}
          playerSlect={playerSlect}
          playerList={playerList}
          playerSelectHandler={playerSelectHandler}
          set={set}
          reset={reset}
          isBasic={isBasic}
          setIsBasic={setIsBasic}
          pirate={pirate}
          cardHint={cardHint}
          trade={trade}
          setTrade={setTrade}
          politic={politic}
          setPolitic={setPolitic}
          science={science}
          setScience={setScience}
          list={list}
          startIndex={startIndex}
          diceData={diceData}
          {...pageProps}
        />
      </Layout>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
export default MyApp;
