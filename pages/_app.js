import '../styles/globals.css'
import { useState, useEffect, createContext } from 'react'
import io from 'socket.io-client'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import 'animate.css'

let socket = null
export const animateContext = createContext()

function MyApp({ Component, pageProps }) {

  let players = ['仲', '高', '宇', '敏', '霞', '炜'];
  let deDire = Array(11).fill(0);
  let deSec = Array(6).fill(false)
  let [playerSlect, setPlayerSlect] = useState(players);
  let [playerList, setPlayerList] = useState([]);
  let [dieOne, setDieOne] = useState(2);
  let [dieTwo, setDieTwo] = useState(3);
  let [dieThree, setDiceThree] = useState(0);
  let [round, setRound] = useState(0);
  let [diceRecord, setDiceRecord] = useState(deDire); 
  let [index, setIndex] = useState();
  let [currentPlayer, setCurrentPlayer] = useState();
  let [animation, setAnimation] = useState(false);
  let [diceData, setDiceData] = useState([]);
  let [selected, setSelected] = useState(deSec);
  let [isBasic, setIsBasic] = useState(true);
  let [pirate, setPirate] = useState(0);
  let [trade, setTrade] = useState([]);
  let [politic, setPolitic] = useState([]);
  let [science, setScience] = useState([]);
  let [cardHint, setCardHint] = useState('');
  let [startIndex, setStartIndex] = useState();
  let [list, setList] = useState([])
  let [playList, setPlayList] = useState([])
  let [darr, setDarr] = useState([0, 10])
  let [audio, setAudio] = useState('')
  let [count, setCount] = useState(0)
  const router = useRouter()

  useEffect(() => {

    if(!socket) socket = io('https://daaije-server.herokuapp.com')

    if (!list.length) {

      fetch('https://daaije-server.herokuapp.com/get_whole_list')
      .then((res) => res.json())
      .then((data) => setList(data.list))
      .catch((err) => ('Error occurred', err))

    }

    if (!playList.length) {

      fetch('https://daaije-server.herokuapp.com/get_list')
      .then((res) => res.json())
      .then((data) => setPlayList(data.data))
      .catch((err) => ('Error occurred', err))

    }

    socket?.on('get', data => {

      setDieOne(data.ndo)
      setDieTwo(data.ndt)
      setRound(data.nrd)
      setIndex(data.nix)
      setDiceRecord(data.ndr)
      setDiceData(data.ndd)
      setAnimation(true)
      setCurrentPlayer(data.ncp)
      setAudio(data.nau)
      if (data.nch) {
        setPirate(data.npa)
        setDiceThree(data.ned)
        setCardHint(data.nch)
      }

    })

    socket?.on('progress-info', data => {
      if (data.dice === 3) setTrade(data.clone)
      else if (data.dice === 4) setPolitic(data.clone)
      else if (data.dice === 5) setScience(data.clone)
    })
   
    socket?.on('init', initData => {

      setCurrentPlayer(initData.ncp)
      setIndex(initData.npl.indexOf(initData.ncp))
      setPlayerList(initData.npl)
      setStartIndex(initData.nsi)
      setPlayerSlect(initData.nps)
      setRound(0)
      setDiceRecord(Array(11).fill(0))
      setDiceData([])
      setDarr(initData.nda)

      initKnight(initData.npl.length)

    })

  }, [socket])

  useEffect(() => {

    if (audio) {
      let line
      let daaije = Math.random() > 0.5 ? "/music/yyds.m4a" : "/music/daaije.m4a" 
      if(audio) {
        line = new Audio(`https://daaije-server.herokuapp.com/uploads/${audio}`)
      }
      let sound = new Audio(daaije)

      setTimeout(() => {
          setAnimation(false)
          setAudio('')
      }, 1500);

      if (darr.indexOf(dieOne + dieTwo) > -1) sound.play();
      else line && line.play();
    }

  }, [audio])

  useEffect(() => {

    let data = {
      ndo: dieOne,
      ndt: dieTwo,
      nrd: round,
      nix: index,
      ndr: diceRecord,
      ndd: diceData,
      ncp: currentPlayer,
      nau: audio,
    }

    if (!isBasic) data = {...data, ned: dieThree, npa: pirate, nch: cardHint}
    count && socket.emit('send', data)

  }, [count])

  let playerSelectHandler = (e) => {

    let array = [];
    let clone = playerList;

    clone.push(e);

    for (let i = 0; i < playerSlect.length; i++) {
      if (playerSlect[i] !== e) {
        array.push(playerSlect[i]);
      }
    }

    setPlayerSlect(array);
    setPlayerList(clone);
  }

  let playerListHandler = (v, i) => {

    setCurrentPlayer(v);
    setStartIndex(playerList.indexOf(v));
    let clone = Array(playerList.length).fill(false);
    clone[i] = !clone[i];
    setSelected(clone);

  }

  let reset = () => {

    setPlayerList([]);
    setPlayerSlect(players);
    setCurrentPlayer();
    setSelected(deSec)

  }

  let set = () => {

    let data = {
      ncp: currentPlayer,
      npl: playerList,
      nsi: startIndex,
      nps: playerSlect,
      nda: darr
    }

    if (playerList.length && currentPlayer) {
      if (isBasic) {
        router.push('/Main');
      } else {
        router.push('/Knight');
        initKnight(playerList.length)
      }
  
      setRound(0);
      setDiceRecord(deDire);
      setIndex(playerList.indexOf(currentPlayer));
      setDiceData([]);
      setSelected(deSec);
      socket.emit('start', data)
    }

  }

  let roll = (re) => {

    let clone = diceRecord
    let dataClone = diceData
    let ra = Math.floor(Math.random()*6)
    let rb = Math.floor(Math.random()*6)

    if (re) {
      clone[dieOne + dieTwo]--;
      dataClone.pop();
    } else {
      setRound(pre => pre + 1);
      setIndex(pre => pre + 1);
      setCurrentPlayer(playerList[(index + 1) % playerList.length]);
    }

    clone[ra + rb]++;
    dataClone.push(ra + rb + 2);
    setDiceRecord(clone);
    setDiceData(dataClone);
    setDieOne(ra);
    setDieTwo(rb);
    setAnimation(true);
    setAudio(playList[Math.floor(Math.random()*playList.length)])
    setCount(pre => pre + 1)
    
    if (!isBasic) {
      let rc = Math.floor(Math.random()*6)

      if (dieThree < 3 && re) {
        pirate ? setPirate(pre => pre - 1) : setPirate(5);
      }

      handdleDiceThree(rc, ra)
      setDiceThree(rc);
    }

  }

  let cardHandle = (field, which, dice) => {

    let copy = [...field];
    let list = [];
    let words = "攞" + which + "卡";

    for (let i = 0; i < copy.length; i++) {
      if (copy[i] !== 0 && copy[i] >= dice) list.push(playerList[i]);
    }

    if (!list.length) setCardHint('无人可以攞卡！');
    else {
      words = list.join('、') + words;
      setCardHint(words);
    }

  }

  let handdleDiceThree = (rc, ra) => {

    switch(rc) {
      case 3:
        cardHandle(trade, "贸易", ra)
        break
      case 4:
        cardHandle(politic, "政治", ra)
        break
      case 5:
        cardHandle(science, "科技", ra)
        break
      default:
        setPirate(pre => pre + 1);
        setCardHint('无卡攞！')
        break
    }

  }

  let initKnight = length => {
    let defaultArray = Array(length).fill(0);
    setPirate(0);
    setTrade(defaultArray);
    setPolitic(defaultArray);
    setScience(defaultArray);
  }

  return (

    <animateContext.Provider value={{animation, dieOne, dieTwo, dieThree, setCurrentPlayer, roll, round, currentPlayer, socket}}>
      <Layout>
        <Component
          darr={darr}
          setDarr={setDarr}
          playerSlect={playerSlect} 
          playerList={playerList} 
          playerListHandler={playerListHandler} 
          playerSelectHandler={playerSelectHandler} 
          set={set} 
          reset={reset} 
          selected={selected} 
          isBasic={isBasic} 
          setIsBasic={setIsBasic}
          pirate={pirate} 
          cardHint={cardHint} 
          trade={trade} setTrade={setTrade} 
          politic={politic} 
          setPolitic={setPolitic} 
          science={science} 
          setScience={setScience}
          list={list} 
          playList={playList} 
          setPlayList={setPlayList}
          startIndex={startIndex}
          diceData={diceData}
          diceRecord={diceRecord}
          {...pageProps} 
        />
      </Layout>
    </animateContext.Provider>

  )

}

export default MyApp
