import { useRouter } from 'next/router'
import { useContext } from 'react/'
import { animateContext } from '../pages/_app'

export default function SecondHalf() {

    const router = useRouter()
    const { animation, setCurrentPlayer, roll, round, currentPlayer } = useContext(animateContext)

    return(

        <>
            <p id="total">
                第 <span style={{fontWeight: 'bold'}}>{round}</span> 次，下一个: <span style={{fontWeight: 'bold'}}>{currentPlayer}</span>
            </p>
            <p className="hint">老点大爷帅气头像摇骰子</p>
            <div onClick={() => roll(false)}
                style={{
                    borderRadius: '5px',
                    width: '110px',
                    height: '100px',
                    backgroundImage: 'url("yyds.jpg")',
                    backgroundSize: 'cover'
                }}
                className={animation ? 'animate__animated animate__rubberBand' : ''}
            >
            </div>
            <div className='button-wrapper'>
                <button onClick={() => {router.push('/'); setCurrentPlayer('')}} className="reset">设定</button>
                <button onClick={() => roll(true)} className="reset" style={{backgroundColor: '#d00000'}} disabled={round ? false : true}>重摇</button>
                <button onClick={() => router.push('/Dice')} className="reset" style={{backgroundColor: '#606c38'}}>次数记录</button>
                <button onClick={() => router.push('/Player')} style={{backgroundColor: '#2ec4b6'}} className="reset">玩家记录</button>
            </div>
        </>

    )

}