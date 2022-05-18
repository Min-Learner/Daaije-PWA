import { useEffect, useRef } from "react"
import { useRouter } from "next/router"

export default function Player({diceData, isBasic, startIndex, playerList}) {

    const target = useRef()
    const router = useRouter()

    useEffect(() => {
        target.current.scrollIntoView()
    }, [])

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr className="h-12 bg-violet-600">
                        <th>次数</th>
                        <th>玩家</th>
                        <th>点数</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        diceData.map((data, index) => {
                            return (
                                <tr key={index} className='even:bg-white/30'>
                                    <td>{index + 1}</td>
                                    <td>{playerList[(index + startIndex) % playerList.length]}</td>
                                    <td>{data}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <button ref={target} onClick={() => isBasic ? router.push('/Main') : router.push('/Knight')} className='btn bg-green-600/70 mt-3'>返回</button>
        </div>
    )

}