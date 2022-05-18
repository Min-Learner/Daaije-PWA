export default function Lists({ item, which, handdleAction, handlePlay }) {

    return (

        <div className='flex justify-between items-center h-11 px-2.5 odd:bg-white/30'>
            <span className='flex-1 text-lg overflow-hidden whitespace-nowrap text-ellipsis' onClick={() => handlePlay && handlePlay(item)}>
                {item.replace('（', '').replace('）-原版-', '').replace('.mp3', '').replace('【', '-').replace('】', '')}
            </span>
            <span className='text-xl text-black/60' onClick={() => handdleAction(item)}>
                {which ? '+' : '✘'}
            </span>
        </div>

    )

}