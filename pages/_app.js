import '../styles/globals.css'
import { useState, useEffect, createContext } from 'react'
import io from 'socket.io-client'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import 'animate.css'

let socket, wakeLock
export const animateContext = createContext()

function MyApp({ Component, pageProps }) {

  let players = ['仲', '高', '宇', '敏', '霞', '炜']
  let [playerSlect, setPlayerSlect] = useState(players)
  let [playerList, setPlayerList] = useState([])
  let [dieOne, setDieOne] = useState(2)
  let [dieTwo, setDieTwo] = useState(3)
  let [dieThree, setDiceThree] = useState(0)
  let [round, setRound] = useState(0)
  let [currentPlayer, setCurrentPlayer] = useState()
  let [animation, setAnimation] = useState(false)
  let [diceData, setDiceData] = useState([])
  let [isBasic, setIsBasic] = useState(true)
  let [pirate, setPirate] = useState(0)
  let [trade, setTrade] = useState([])
  let [politic, setPolitic] = useState([])
  let [science, setScience] = useState([])
  let [cardHint, setCardHint] = useState('')
  let [startIndex, setStartIndex] = useState()
  let [list, setList] = useState([])
  let [playList, setPlayList] = useState([])
  let [darr, setDarr] = useState([0, 10])
  let [count, setCount] = useState(0)
  let [bgc, setBgc] = useState()
  const router = useRouter()

  useEffect(async () => {

    if(!socket) socket = io('https://daaije-server.herokuapp.com/')

    try {wakeLock = await navigator.wakeLock.request('screen')}
    catch (err) {return}

    if (!list.length) {

      fetch('https://daaije-server.herokuapp.com/get_whole_list')
      .then((res) => res.json())
      .then((data) => setList(data.list))

    }

    if (!playList.length) {

      fetch('https://daaije-server.herokuapp.com/get_list')
      .then((res) => res.json())
      .then((data) => setPlayList(data.data))

    }

    socket.on('get', data => {

      setDieOne(data.ndo)
      setDieTwo(data.ndt)
      setRound(data.nrd)
      setDiceData(data.ndd)
      setAnimation(true)
      setCurrentPlayer(data.ncp)
      if (!playerList.length) {
        setPlayerList(data.playerList)
        setStartIndex(data.startIndex)
      }
      if (data.nch) {
        setPirate(data.npa)
        setDiceThree(data.ned)
        setCardHint(data.nch)
      }

    })

    socket.on('progress-info', data => {
      if (data.dice === 3) setTrade(data.clone)
      else if (data.dice === 4) setPolitic(data.clone)
      else if (data.dice === 5) setScience(data.clone)
    })
   
    socket.on('init', initData => {

      setCurrentPlayer(initData.ncp)
      setPlayerList(initData.npl)
      setStartIndex(initData.nsi)
      setPlayerSlect(initData.nps)
      setRound(0)
      setDiceData([])
      setDarr(initData.nda)

      initKnight(initData.npl.length)

    })

    socket.on('voice-msg', msg => {

      if (msg.indexOf('各種') > -1) {
        let res = new Audio("/music/daaije.m4a")
        res.play()
      } else if (msg.indexOf('背景') > -1) {
        let a = creatRandomNumber(256)
        let b = creatRandomNumber(256)
        let c = creatRandomNumber(256)
        setBgc(`rgb(${a}, ${b}, ${c})`)
      } else setBgc(msg.toLowerCase())

    })

  }, [])

  useEffect(() => {

    setTimeout(() => {
      setAnimation(false)
    }, 1500)

  }, [animation])

  useEffect(() => {

    let data = {
      ndo: dieOne,
      ndt: dieTwo,
      nrd: round,
      ndd: diceData,
      ncp: currentPlayer,
      playerList,
      startIndex
    }

    if (!isBasic) data = {...data, ned: dieThree, npa: pirate, nch: cardHint}
    count && socket.emit('send', data)

  }, [count])

  let playerSelectHandler = (e) => {

    let array = []
    let clone = playerList

    clone.push(e)

    for (let i = 0; i < playerSlect.length; i++) {
      if (playerSlect[i] !== e) {
        array.push(playerSlect[i])
      }
    }

    setPlayerSlect(array)
    setPlayerList(clone)
  }

  let reset = () => {

    setPlayerList([])
    setPlayerSlect(players)

  }

  let set = () => {

    let randomStartNumber = creatRandomNumber(playerList.length)
    let randomStartPlayer = playerList[randomStartNumber]

    if (playerList.length) {
      if (isBasic) {
        router.push('/Main')
      } else {
        router.push('/Knight')
        initKnight(playerList.length)
      }
  
      setRound(0)
      setStartIndex(randomStartNumber)
      setCurrentPlayer(randomStartPlayer)
      setDiceData([])

      let data = {
        ncp: randomStartPlayer,
        npl: playerList,
        nsi: randomStartNumber,
        nps: playerSlect,
        nda: darr
      }
      socket.emit('start', data)
    }

  }

  let roll = (re) => {

    let dataClone = diceData
    let ra = creatRandomNumber(6)
    let rb = creatRandomNumber(6)

    if (re) {
      dataClone.pop()
    } else {
      setRound(pre => pre + 1)
      setCurrentPlayer(playerList[(round + startIndex + 1) % playerList.length])
    }

    dataClone.push(ra + rb + 2)
    playAudio(ra, rb)
    setDiceData(dataClone)
    setDieOne(ra)
    setDieTwo(rb)
    setAnimation(true)
    setCount(pre => pre + 1)
    
    if (!isBasic) {
      let rc = creatRandomNumber(6)

      if (dieThree < 3 && re) {
        pirate ? setPirate(pre => pre - 1) : setPirate(5)
      }

      handdleDiceThree(rc, ra)
      setDiceThree(rc)
    }

  }

  let cardHandle = (field, which, dice) => {

    let copy = [...field]
    let list = []
    let words = "攞" + which + "卡"

    for (let i = 0; i < copy.length; i++) {
      if (copy[i] !== 0 && copy[i] >= dice) list.push(playerList[i])
    }

    if (!list.length) setCardHint('无人可以攞卡！')
    else {
      words = list.join('、') + words
      setCardHint(words)
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
        setPirate(pre => pre + 1)
        setCardHint('无卡攞！')
        break
    }

  }

  let initKnight = length => {
    let defaultArray = Array(length).fill(0)
    setPirate(0)
    setTrade(defaultArray)
    setPolitic(defaultArray)
    setScience(defaultArray)
  }

  let creatRandomNumber = n => Math.floor(Math.random() * n)

  let playAudio = (a, b) => {

    let audio = playList[creatRandomNumber(playList.length)]
    if (audio) {
      let line = new Audio(`https://daaije-server.herokuapp.com/uploads/${audio}`)
      let daaije = Math.random() > 0.5 ? "/music/yyds.m4a" : "/music/daaije.m4a" 
      let sound = new Audio(daaije)

      if (darr.indexOf(a + b) > -1) sound.play()
      else line.play()
    }

  }

  return (

    <animateContext.Provider value={{animation, dieOne, dieTwo, dieThree, setCurrentPlayer, roll, round, currentPlayer, socket}}>
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
          bgc={bgc}
          {...pageProps} 
        />
      </Layout>
    </animateContext.Provider>

  )

}

export default MyApp
