export default function Inform({message}) {

    return (

        <div className={`fixed top-0 left-0 w-full h-full flex bg-transparent z-50 ${message ? 'block' : 'hidden'}`}>
            <div className="w-64 h-44 m-auto flex justify-center items-center bg-black/70 text-3xl">
                {message}
            </div>
        </div>

    )

}