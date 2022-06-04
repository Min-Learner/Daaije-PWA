import Text from '../components/Text'
import { useRouter } from 'next/router'
import Line from '../components/Line'

export default function Home({darr, setDarr, playerSlect, playerList, playerSelectHandler, set, reset, isBasic, setIsBasic}) {

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
      <div className='bg-[#f45b69] flex justify-center items-center min-h-screen flex-col'>
            <div className='relative w-full flex justify-center items-center py-[15px]'>
                <div className='w-[90%] absolute fill-white animate__animated animate__zoomIn animate__delay-3s'>
                    <Line />
                </div>
                <div className='animate__animated animate__hinge animate__delay-1s w-[80%]'>
                    <Text />
                </div>
            </div>
            <p className='text-white text-xl animate__animated animate__bounceInLeft'>按座位顺序选择玩家</p>
            <div className='w-full flex justify-around my-[15px] h-[35px]'>
                {playerSlect.map((player) => {
                    return (
                        <p key={player}
                            className='w-9 h-9 rounded-full bg-white text-2xl flex justify-center items-center'
                            onClick={() => playerSelectHandler(player)}
                        >
                            {player}
                        </p>
                    );
                })}
            </div>
            <p className='text-white text-xl animate__animated animate__bounceInRight'>系统将随机选择开始玩家</p>
            <div className='w-full flex justify-around my-[15px] h-[35px]'>
                {playerList.map((player) => {
                    return (
                        <p key={player} className='w-9 h-9 rounded-full bg-white text-2xl flex justify-center items-center'>
                            {player}
                        </p>
                    )
                })}
            </div>
            <p className='text-white text-xl animate__animated animate__tada'>选择大爷录音播放数字</p>
            <div className='flex justify-around items-center w-full flex-wrap mt-3.5 mb-2.5'>
                {arr().map((number) => {
                    return (
                        <p key={number} 
                            className='basis-[15%] py-1 bg-slate-100 text-center text-lg mb-2 rounded-md opacity-30'
                            style={darr.indexOf(number - 2) > -1 ? {opacity: 1} : null}
                            onClick={() => audioNumber(number)}
                        >
                            {number}
                        </p>
                    )
                })}
            </div>
            <div className='w-full flex justify-center items-center'>
                <p className='text-lg text-white'>选择游戏模式: </p>
                <button type='button' className={`bg-white text-lg ml-2.5 px-2 py-1 ${isBasic ? 'text-white bg-gray-800' : ''}`} onClick={() => setIsBasic(true)}>基本包</button>
                <button type='button' className={`bg-white text-lg ml-2.5 px-2 py-1 ${isBasic ? '' : 'text-white bg-gray-800'}`} onClick={() => setIsBasic(false)}>騎士包</button>
            </div>
            <div className='flex justify-around w-[95%] mt-5'>
                <button type='button' className='btn bg-green-500' onClick={set}>确定</button>
                <button type='button' className='btn bg-orange-500' onClick={reset}>重置</button>
                <button type='button' className='btn bg-amber-500' onClick={() => router.push('/List')}>台词列表</button>
                <button type='button' className='btn bg-sky-500' onClick={() => router.push('/PlayList')}>播放列表</button>
            </div>
        </div>
    </>
  )
}


