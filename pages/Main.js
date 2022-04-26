import Typed from "typed.js"
import { useRef, useEffect } from 'react'
import Dices from '../components/Dices'
import SecondHalf from "../components/SecondHalf"
import Image from 'next/image'
import Total from "../components/Total"

export default function Main() {

    let el = useRef()
    let quotes = [
        '你疴屎揼到屌啊',
        '我错屌去嗲',
        '你又老閪我，让你又无知道',
        '逗逗你嗻啊',
        '我终于觉得有啲啲仔意思嗲',
        '你知唔知呢半个钟我点过㗎',
        '去到菉塘，记得揇虾酱哇',
        '做咩屌嗰，竟然畀仲哥赢',
        '勝ちに行くぞぉぉ',
        '垃圾游戏，都无好撩嗰',
        '冧斜嗰肥佬真真无死得落着',
        '压三家，标准玩法啊',
        'やられたらやり返す'
    ]

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: quotes, 
            startDelay: 300,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 500,
            smartBackspace: true,
            loop: true,
            showCursor: false
        });

        return () => typed.destroy();
    }, []);

    return (
        <div className="container">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span className="bottom-line" ref={el}></span>
                <div style={{display: 'flex'}}>
                    <Image src={'/daye.png'} width={35} height={35} />
                </div>
            </div>
            <Total />
            <div className="dice-wrapper" style={{width: '250px'}}>
                <Dices />
            </div>
            <SecondHalf />
        </div>
    )

}