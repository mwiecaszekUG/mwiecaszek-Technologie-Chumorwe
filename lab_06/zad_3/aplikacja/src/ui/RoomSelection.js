import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {Formik, Form, Field} from "formik"

const RoomSelection = (props) => {

    useEffect(() => {
        props.client.subscribe("/app/rooms")
        props.client.on("message", (topic, message) => {
            if (topic === "/app/rooms") {
                setCouseRefresh(Math.random())
            }
        })
        axios.get("http://localhost:5000/riddles").then((response) => {
            setRiddles(response.data)
        })
    }, [props.client])

    const [riddles, setRiddles] = useState([])

    const history = useHistory()

    const [rooms, setRooms] = useState([])

    const [form, setFrom] = useState(<div></div>)

    const [couseRefresh, setCouseRefresh] = useState(0)

    useEffect(() => {
        axios.get("http://localhost:5000/rooms").then((response) => {
            setRooms(response.data)
        })
    }, [couseRefresh])


    const handleJoin = (id) => {
        history.push(`/rooms/${id}`)
    }

    const handleSubmit = (values) => {
        if (values.name) {
            axios.post("http://localhost:5000/rooms", values)
            props.client.publish("/app/rooms", `Utworzono pokój ${values.name}`)
            setFrom(<div></div>)
        }
    }

    return (
        <div className="riddle_list_element">
            <button className="create" onClick={() => setFrom(<div>
            <Formik
            enableReinitialize={true}
            onSubmit={(values) => handleSubmit(values)}
            initialValues={{
                name: "",
                riddles: riddles.sort(() => (Math.random() > 0.5) ? 1 : -1)
            }}>
                <Form>
                    <label>Nazwa pokoju: </label><Field name="name" />
                    <button type="submit">Utwórz pokój</button>
                </Form>
            </Formik>
        </div>)}>Utwórz nowy pokój gry</button>
            {form}
            <h1>Tu się wybiera pokój</h1>
            {rooms.map((room) => {              
                let ammount = room.players.length
                return (
                    <div className="room_list" key={room._id}>
                        <h2>Pokój - {room.name}</h2>
                        <p>Liczba graczy: {ammount}</p>
                        <button onClick={() => handleJoin(room._id)}>Dołącz</button>
                        <button onClick={() => axios.delete(`http://localhost:5000/rooms/${room._id}`)}>123</button>
                    </div>
                )
            })}
        </div>
    )
}

export default RoomSelection;