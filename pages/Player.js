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
            <table style={{width: '90%'}}>
                <thead>
                    <tr>
                        <th>次数</th>
                        <th>玩家</th>
                        <th>点数</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        diceData.map((data, index) => {
                            return (
                                <tr key={index * 7}>
                                    <td>{index + 1}</td>
                                    <td>{playerList[(index + startIndex) % playerList.length]}</td>
                                    <td className="times">{data}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <button ref={target} onClick={() => isBasic ? router.push('/Main') : router.push('/Knight')} className='buttons'>返回</button>
        </div>
    )

}