export default function Inform({message}) {

    return (

        <div style={{position: 'fixed',
                         top: '50%',
                         left: '50%',
                         transform: 'translate(-50%, -50%)',
                         fontSize: '25px',
                         color: 'white',
                         backgroundColor: 'rgba(0, 0, 0, 0.7)',
                         display: message ? 'block' : 'none',
                         width: '250px',
                         height: '150px',
                         textAlign: 'center',
                         lineHeight: '150px',
                         borderRadius: '10px',
                         zIndex: '999'
                        }}
            >
                {message}
        </div>

    )

}