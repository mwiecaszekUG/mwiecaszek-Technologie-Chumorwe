
import Chat from "../functions/Chat"


const HomePage = (props) => {

    return (
        <div>
            <h3>Czy chcesz zagrać w grę?</h3>
            <Chat client={props.client} />
        </div>
    )
}


export default HomePage