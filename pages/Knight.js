import Pirate from '../components/Pirate'
import SecondHalf from '../components/SecondHalf'
import Image from 'next/image'
import Total from '../components/Total'
import { useRouter } from 'next/router'
import EventDice from '../components/EventDice'
import Dices from '../components/Dices'

export default function Knight({pirate, cardHint}) {
    
    let x = (pirate % 7 * 39 + 21) + 'px'
    let y = ((pirate % 7) % 2) ? '40%' : '0'
    const router = useRouter()

    return (
        <div className="container">
            <div className='progress'>
                <div style={{transform: `translate(${x}, ${y})`, zIndex: 999}}>
                    <Pirate />
                </div>
                <span>大</span>
                <span>爷</span>
                <span>世</span>
                <span>界</span>
                <span>最</span>
                <span>威</span>
                <span>武</span>
                <span style={{border: 'none'}} onClick={() => router.push('/Progress')}>
                    <Image alt='' src='/daye.png' width={35} height={35} />
                </span>
            </div>
            <p className='message'>{cardHint}</p>
            <Total />
            <div className="dice-wrapper" style={{width: '100%'}}>
                <Dices />
                <EventDice />
            </div>
            <SecondHalf />
        </div>
    )

}