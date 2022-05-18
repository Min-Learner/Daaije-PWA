import { useContext } from "react/"
import Politic from '../components/Politic'
import Science from '../components/Science'
import Skull from '../components/Skull'
import Trade from '../components/Trade'
import { animateContext } from "../pages/_app"

export default function EventDice() {

    const { animation, dieThree} = useContext(animateContext)

    return (

        <div className={`w-[100px] ${animation ? 'shake' : ''}`}>
            <div className={dieThree < 3 ? 'w-[100px] h-[100px] rounded-xl p-2.5 absolute top-0 border-2 border-black' : 'hidden'}>
                <Skull />
            </div>
            <div className={dieThree === 3 ? 'w-[100px] h-[100px] rounded-xl p-2.5 absolute top-0 border-2 border-black' : 'hidden'}>
                <Trade />
            </div>
            <div className={dieThree === 4 ? 'w-[100px] h-[100px] rounded-xl p-2.5 absolute top-0 border-2 border-black' : 'hidden'}>
                <Politic />
            </div>
            <div className={dieThree === 5 ? 'w-[100px] h-[100px] rounded-xl p-2.5 absolute top-0 border-2 border-black' : 'hidden'}>
                <Science />
            </div>
        </div>

    )

}