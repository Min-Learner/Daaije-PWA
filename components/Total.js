import Arrow from './Arrow'
import Confetti from 'react-confetti'
import { useRef, useContext } from 'react'
import { animateContext } from '../pages/_app'

export default function Total() {

    const target = useRef()
    const {dieOne, dieTwo, animation} = useContext(animateContext)

    return (

        <div style={{display: 'flex'}}>
            {dieOne + dieTwo === 0 || dieOne + dieTwo == 10 ?
                animation ?
                <Confetti
                    recycle={false} 
                    tweenDuration={500} 
                    gravity={0.4}
                    confettiSource={{
                        x: target.current.getBoundingClientRect().left + 60,
                        y: target.current.getBoundingClientRect().top,
                        h: 70
                    }}
                /> : 
                null :
                null
            }
            <div className='arrow-wrapper'>
                {dieOne + dieTwo !== 0 ? <Arrow /> : null}
            </div>
            <div ref={target} style={{overflow: 'hidden', width: '120px', height: '150px', margin: '0 25px'}}>
                <div className="img-wrapper" style={{transform: `translateX(-${(dieOne + dieTwo) * 120}px)`}}>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                    <span>11</span>
                    <span>12</span>
                </div>
            </div>
            <div className='arrow-wrapper' style={{transform: 'rotate(180deg)'}}>
                {dieOne + dieTwo !== 10 ? <Arrow /> : null}
            </div>
        </div>

    )

}