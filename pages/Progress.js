import DataHandle from '../components/DataHandle';
import { useRouter } from 'next/router';


export default function Progress({playerList, trade, setTrade, politic, setPolitic, science, setScience}) {

    const router = useRouter()

    return (
        <div className='flex flex-col justify-center items-center min-h-screen text-white bg-[#f45b69] py-5 px-2.5'>
            <div className='flex w-full'>
                <div className='flex-1 text-center py-2.5 px-1.5'></div>
                <div className='flex-1 text-center py-2.5 px-1.5 bg-[rgb(250,163,7)]'>贸易-布</div>
                <div className='flex-1 text-center py-2.5 px-1.5 bg-[rgb(0,119,182)]'>政治-币</div>
                <div className='flex-1 text-center py-2.5 px-1.5 bg-[rgb(64,145,108)]'>科技-纸</div>
            </div>
            <div className='flex w-full'>
                <div className='flex-1'>
                    {playerList.map(p => {
                        return <div className='flex justify-center items-center h-14 text-xl odd:bg-white/20' key={p}>{p}</div>
                    })}
                </div>
                <div className='flex-1 flex flex-col justify-center items-center'>
                    {trade.map((data, index) => {
                        return <DataHandle  key={index} dice={3} field={trade} setField={setTrade} index={index} data={data} />
                    })}
                </div>
                <div className='flex-1 flex flex-col justify-center items-center'>
                    {politic.map((data, index) => {
                        return <DataHandle  key={index} dice={4} field={politic} setField={setPolitic} index={index} data={data} />
                    })}
                </div>
                <div className='flex-1 flex flex-col justify-center items-center'>
                    {science.map((data, index) => {
                        return <DataHandle  key={index} dice={5} field={science} setField={setScience} index={index} data={data} />
                    })}
                </div>
            </div>
            <button type='button' className='btn bg-orange-300 mt-5' onClick={() => router.push('/Knight')}>確定</button>   
        </div>
    )

}