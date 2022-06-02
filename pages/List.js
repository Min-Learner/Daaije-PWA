import { useState, useRef } from 'react'
import Inform from '../components/Inform'
import { useRouter } from 'next/router'
import Lists from '../components/Lists'

export default function List({list, playList, setPlayList}) {

    let bottomRef = useRef(null)
    let [copy, setCopy] = useState([...list])
    let [response, setResponse] = useState('')
    const router = useRouter()

    let handleSearch = e => {

        let keyword = e.target.value
        if (keyword) {
            let filterList = [...list].filter(i => i.indexOf(keyword) >= 0)
            setCopy(filterList)
        } else setCopy([...list])

    }

    let toBottom = () => {
        bottomRef.current.scrollIntoView({behavior: 'smooth'})
    }

    let handdleAdd = (e) => {

        setResponse('处理中...')
        fetch('https://daaije-server.herokuapp.com/add_list', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: e})
        })
        .then(res => res.json())
        .then(res => {
            if (res.message !== '已在列表中！') {
                let copy = [...playList, e]
                setPlayList(copy)
            }
            setResponse(res.message)
            console.log(res.message)
            setTimeout(() => {
                setResponse('')
            }, 700);
        })
        .catch(err => ('Error occurred', err))

    }

    let handlePlay = (e) => {

        let url = 'https://daaije-server.herokuapp.com/uploads/' + e
        let audio = new Audio(url)
        audio.play()

    }

    return(
        <div className="table-wrapper text-white">
            <Inform message={response} />
            <div className='flex items-center fixed top-0 w-full p-3.5 bg-red-500'>
                <input type={'text'} className='rounded py-2 pl-2 text-base outline-none text-black' placeholder='搜索' onChange={e => handleSearch(e)} />
                <div onClick={toBottom} className='ml-auto text-4xl'>&#8659;</div>
            </div>
            <div className='w-full px-2.5 pt-14'>
                {copy.map(item => {
                    return(
                        <Lists key={Math.random()} item={item} which={true} handdleAction={handdleAdd} handlePlay={handlePlay} />
                    )
                })}
            </div>
            <button type='button' ref={bottomRef} className='btn bg-green-600/70 mt-3' onClick={() => router.push('/')}>返回</button>
        </div>
    )

}
