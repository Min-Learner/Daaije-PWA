import Close from "./Close"
import Plus from "./Plus"

export default function Lists({ item, which, handdleAction, handlePlay }) {

    return (

        <div className='line-wrapper'>
            <span className='text' onClick={() => handlePlay && handlePlay(item)}>
                {item.replace('（', '').replace('）-原版-', '').replace('.mp3', '').replace('【', '-').replace('】', '')}
            </span>
            <span className='close' onClick={() => handdleAction(item)}>
                {which ? <Plus /> : <Close />}
            </span>
        </div>

    )

}