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
        <div className="table-wrapper" style={{color: 'white'}}>
            <Inform message={display} />
            <div style={{width: '100%', padding: '10px 10px 0px 10px'}}>
                {playList.map(item => {
                    return(
                        <Lists key={Math.random()} item={item} which={false} handdleAction={handdleDelete} />
                    )
                })}
            </div>
            <button className='buttons' onClick={() => router.push('/')}>返回</button>
        </div>
    )

}