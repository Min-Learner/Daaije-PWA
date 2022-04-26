import styles from '../styles/Progress.module.css'
import { animateContext } from '../pages/_app'
import { useContext } from 'react'

export default function DataHandle({field, setField, index, data, dice}) {

    let { socket } = useContext(animateContext)

    let dataHandle = (or, index) => {

        let clone = [...field]; //关键一步，不解构复制的话，React视原state没有发生变化！！
        if (or && clone[index] < 5) clone[index]++;
        if (!or && clone[index] > 0) clone[index]--;
        setField(clone);

        let data = {dice, clone}
        socket.emit('send-progress-info', data)

    }

    return (
        <div className={styles.dataCell}>
            <button className={styles.buttons} onClick={() => dataHandle(false, index)}>-</button>
            <p className={styles.data}>{data}</p>
            <button className={styles.buttons} onClick={() => dataHandle(true, index)}>+</button>
        </div>
    )

}