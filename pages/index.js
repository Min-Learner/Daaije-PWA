import styles from '../styles/Setting.module.css'
import Text from '../components/Text'
import { useRouter } from 'next/router'
import Line from '../components/Line'

export default function Home({darr, setDarr, playerSlect, playerList, playerListHandler, playerSelectHandler, set, reset, selected, isBasic, setIsBasic}) {

  const router = useRouter()

  let arr = () => {

    let arr = []
    for(let i = 2; i < 13; i++) arr.push(i)
    return arr

  }

  let audioNumber = e => {

    let num = e - 2
    if (darr.indexOf(num) > -1) {
        let narr = darr.filter(i => {
            return i !== num
        })
        setDarr(narr)
    } else setDarr([...darr, num])

  }

  return (
    <>
      <div className={styles.wrapper}>
            <div style={{position: 'relative',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '15px 0'
                }}
            >
                <div
                    style={{
                        width: '90%',
                        position: 'absolute',
                        fill: 'white'
                    }}
                    className='animate__animated animate__zoomIn animate__delay-3s'
                >
                    <Line />
                </div>
                <div style={{width: '80%'}} 
                    className='animate__animated animate__hinge animate__delay-1s'
                >
                    <Text />
                </div>
            </div>
            <p className={styles.text + ' animate__animated animate__bounceInLeft'}>按座位顺序选择玩家</p>
            <div className={styles.playerSlectWrapper}>
                {playerSlect.map((player) => {
                    return (
                        <p key={player} className={styles.player} onClick={() => playerSelectHandler(player)}>
                            {player}
                        </p>
                    );
                })}
            </div>
            <p className={styles.text + ' animate__animated animate__bounceInRight'}>选择开始玩家</p>
            <div className={styles.playerSlectWrapper}>
                {playerList.map((player, index) => {
                    return (
                        <p key={player} onClick={() => {playerListHandler(player, index)}}
                            className={selected[index] ? 
                            `${styles.player} ${styles.transform}` : 
                            `${styles.player} ${styles.opacity}`}
                        >
                            {player}
                        </p>
                    )
                })}
            </div>
            <p className={styles.text + ' animate__animated animate__tada'}>选择大爷录音播放数字</p>
            <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                    margin: '15px 0 10px 0'
                }}
            >
                {arr().map((number) => {
                    return (
                        <p key={number} 
                            className={styles.audioNum}
                            style={darr.indexOf(number - 2) > -1 ? {opacity: 1} : null}
                            onClick={() => audioNumber(number)}
                        >
                            {number}
                        </p>
                    )
                })}
            </div>
            <div className='mode-wrapper'>
                <p style={{fontSize: '16px', color: 'white'}}>选择游戏模式: </p>
                <button className={isBasic ? 'mode-select selected' : 'mode-select'} onClick={() => setIsBasic(true)}>基本包</button>
                <button className={isBasic ? 'mode-select' : 'mode-select selected'} onClick={() => setIsBasic(false)}>騎士包</button>
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} style={{backgroundColor: '#52b788'}} onClick={set}>确定</button>
                <button className={styles.button} style={{backgroundColor: '#fca311'}} onClick={reset}>重置</button>
                <button className={styles.button} style={{backgroundColor: '#dda15e'}} onClick={() => router.push('/List')}>台词列表</button>
                <button className={styles.button} style={{backgroundColor: '#0077b6'}} onClick={() => router.push('/PlayList')}>播放列表</button>
            </div>
        </div>
    </>
  )
}


