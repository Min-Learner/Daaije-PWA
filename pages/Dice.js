import { useRouter } from 'next/router'

export default function Dice({diceData, isBasic}) {

    const router = useRouter()

    let arr = Array(11).fill(0)
    diceData.forEach(d => arr[d-2]++)

    return (
        <div className="table-wrapper">
            <div className='w-11/12 relative border-b-2 border-white/50'>
                <span className='absolute left-[38px] inline-block w-0.5 h-full bg-white/50'></span>
                {arr.map((data, index) => {
                    return (

                        <div key={index} className='h-12 flex items-center'>
                            <span className='text-[25px] text-white w-8 text-center mr-2'>{index + 2}</span>
                            <span className='text-right pr-1 text-xl bg-amber-400'
                                style={{width: data / Math.max(...arr) * 280 + 'px'}}
                            >
                                {data ? data : null}
                            </span>
                        </div>

                    )
                })}
            </div>
            <button type='button' onClick={() => isBasic ? router.push('/Main') : router.push('/Knight')} className='btn bg-green-600/70 mt-3'>返回</button>
        </div>
    )

}