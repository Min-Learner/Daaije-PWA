import { useContext } from "react/"
import Politic from '../components/Politic'
import Science from '../components/Science'
import Skull from '../components/Skull'
import Trade from '../components/Trade'
import { animateContext } from "../pages/_app"

export default function EventDice() {

    const { animation, dieThree} = useContext(animateContext)

    return (

        <div style={{width: '100px'}} className={animation ? 'shake' : ''}>
            <div className={dieThree < 3 ? 'dice-card' : 'opacity'}>
                <Skull />
            </div>
            <div className={dieThree === 3 ? 'dice-card' : 'opacity'}>
                <Trade />
            </div>
            <div className={dieThree === 4 ? 'dice-card' : 'opacity'}>
                <Politic />
            </div>
            <div className={dieThree === 5 ? 'dice-card' : 'opacity'}>
                <Science />
            </div>
        </div>

    )

}