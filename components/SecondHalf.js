import { useRouter } from 'next/router'
import { useContext } from 'react/'
import { animateContext } from '../pages/_app'

export default function SecondHalf() {

    const router = useRouter()
    const { animation, setCurrentPlayer, roll, round, currentPlayer } = useContext(animateContext)

    return(

        <>
            <p className='flex items-center my-4 text-xl'>
                第 {round} 次，下一个:<mark className='text-2xl font-bold px-2'>{currentPlayer}</mark>
            </p>
            <i>老点大爷帅气头像摇骰子</i>
            <div onClick={() => roll(false)}
                className={animation ? 'animate__animated animate__rubberBand' : ''}
            >
                <img src='yyds.jpg' alt='' className='w-28 rounded-md' />
            </div>
            <div className='flex justify-between w-full mt-5'>
                <button onClick={() => {router.push('/'); setCurrentPlayer('')}} className="btn bg-orange-400">设定</button>
                <button onClick={() => roll(true)} className="btn bg-red-600" disabled={round ? false : true}>重摇</button>
                <button onClick={() => router.push('/Dice')} className="btn bg-green-700">次数记录</button>
                <button onClick={() => router.push('/Player')} className="btn bg-sky-600">玩家记录</button>
            </div>
        </>

    )

}