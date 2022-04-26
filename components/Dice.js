import { useContext } from "react/"
import { animateContext } from "../pages/_app"

export default function Dice({ which, dice }) {

    const { animation } = useContext(animateContext)

    return(

        <div className={animation ? 'shake' : ''}>
            <div className={dice === 5 ? which + " dice six" : "opacity"}>
                <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <div className={dice === 4 ? which + " dice five" : "opacity"}>
                <span></span><span></span><span></span><span></span><span></span>
            </div>
            <div className={dice === 3 ? which + " dice four" : "opacity"}>
                <span></span><span></span><span></span><span></span>
            </div>
            <div className={dice === 2 ? which + " dice three" : "opacity"}>
                <span></span><span></span><span></span>
            </div>
            <div className={dice === 1 ? which + " dice two" : "opacity"}>
                <span></span><span></span>
            </div>
            <div className={dice === 0 ? which + " dice one" : "opacity"}>
                <span></span>
            </div>
        </div>

    )

}