import Inform from '../components/Inform'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Lists from '../components/Lists'

export default function PlayList({playList, setPlayList}) {

    let [display, setDisplay] = useState('')
    const router = useRouter()

    let handdleDelete = e => {

        setDisplay('处理中...')
        fetch('https://daaije-server.herokuapp.com/delete_list', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: e})
        })
        .then(res => {

            let copy = [...playList]
            copy = copy.filter(item => {
                return item !== e
            })
            setPlayList(copy)
            setDisplay('')

        })
        .catch(err => ('Error occurred', err))

    }

    return(
        <div className="table-wrapper text-white">
            <Inform message={display} />
            <div className='w-full pt-2.5 pr-2.5 pl-2.5'>
                {playList.map(item => {
                    return(
                        <Lists key={Math.random()} item={item} which={false} handdleAction={handdleDelete} />
                    )
                })}
            </div>
            <button className='btn mt-3 bg-green-600/70' onClick={() => router.push('/')}>返回</button>
        </div>
    )

}