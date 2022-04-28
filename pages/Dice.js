import { useRouter } from 'next/router'

export default function Dice({diceData, isBasic}) {

    const router = useRouter()

    let arr = Array(11).fill(0)
    diceData.forEach(d => arr[d - 2]++)

    return (
        <div className="table-wrapper">
            <div className='chart-wrapper'>
                {arr.map((data, index) => {
                    return (

                        <div key={index} className='row-wrapper'>
                            <span className='chart-number'>{index + 2}</span>
                            <span className='chart-data'
                                style={{width: data / Math.max(...arr) * 280 + 'px'}}
                            >
                                {data ? data : null}
                            </span>
                        </div>

                    )
                })}
            </div>
            <button type='button' onClick={() => isBasic ? router.push('/Main') : router.push('/Knight')} className='buttons'>返回</button>
        </div>
    )

}