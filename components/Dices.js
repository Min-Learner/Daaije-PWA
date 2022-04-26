import { useContext } from "react/"
import { animateContext } from "../pages/_app"
import Dice from "./Dice"

export default function Dices() {

    const { dieOne, dieTwo } = useContext(animateContext)

    return (

        <>
            <Dice dice={dieTwo} which={'second'} />
            <Dice dice={dieOne} which={'first'} />
        </>

    )

}