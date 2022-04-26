import { useRouter } from 'next/router'

export default function Dice({diceRecord, isBasic}) {

    const router = useRouter()

    return (
        <div className="table-wrapper">
            <div className='chart-wrapper'>
                {diceRecord.map((data, index) => {
                    return (

                        <div key={Math.random()} className='row-wrapper'>
                            <span className='chart-number'>{index + 2}</span>
                            <span className='chart-data'
                                style={{width: data / Math.max(...diceRecord) * 280 + 'px'}}
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