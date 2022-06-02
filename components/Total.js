import { useContext } from 'react'
import { animateContext } from '../pages/_app'

export default function Total() {

    const {dieOne, dieTwo} = useContext(animateContext)

    let creatNumbers = () => {
        let array = []
        for(let i = 0; i < 11; i++) {
            array.push(i + 2)
        }
        return array
    }

    return (

        <div className='flex'>
            <div className='w-9 flex items-center justify-center text-5xl'>
                {dieOne + dieTwo !== 0 ? '≮' : null}
            </div>
            <div className='w-[120px] h-[150px] mx-6 overflow-hidden'>
                <div className="flex transition-all" style={{transform: `translateX(-${(dieOne + dieTwo) * 120}px)`}}>
                    {creatNumbers().map((n, i) => {
                        return <span className='text-[100px] text-center flex-none w-[120px] leading-[150px]' key={i}>{n}</span>
                    })}
                </div>
            </div>
            <div className='w-9 flex items-center justify-center text-5xl'>
                {dieOne + dieTwo !== 10 ? '≯' : null}
            </div>
        </div>

    )

}