import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie'


const PlayingRoom = (props) => {

    const [gameData, setGameData] = useState({
        name: "",
        players: [],
        riddles: [{
            answer: "",
            question: ""
        }]
    })

    const [player, setPlayer] = useState({
        id: "0"
    })

    const id = useParams().id

    const [isSub, setisSub] = useState(false)

    const [messages, setMessages] = useState([])


    useEffect(() => {
         props.client.on("message", (topic, message) => {
            if (topic === `/app/rooms/${id}`) {
                message = {text: message.toString()}
                if (! message.text.includes(":")) {
                } else {
                    setMessages([...messages, message].slice(-8))
                    axios.get(`http://localhost:5000/rooms/${id}`).then((response) => {
                setGameData(response.data)
            })
                }
            }
        })
    }, [messages, props.client, id])
    

    useEffect(() => {
        axios.get("http://localhost:5000/users").then((response) => {
            setPlayer(response.data.find((user) => user.login === Cookies.get("login")))
        })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/rooms/${id}`).then((response) => {
            setGameData(response.data)
            if (! response.data.players.includes(`${Cookies.get("login")}`)) {
                axios.post(`http://localhost:5000/rooms/add_player/${id}`, {
                    login: Cookies.get("login"),
                    name: response.data.name
                })
            }
        })
    }, [id])

    useEffect(() => {
        if (! isSub) {

            props.client.subscribe(`/app/rooms/${id}`)
        
            props.client.publish(`/app/rooms/${id}`, `${Cookies.get("login")}: Dołączył do gry`)
        setisSub(true)
        }
        
    }, [id, isSub, props.client])

    useEffect(() => {
        axios.get(`http://localhost:5000/rooms/${id}`).then((response) => {
            setGameData(response.data)
        })
    }, [id])

    const handleMsgSent = () => {
        let value = document.getElementById("msg").value
        if (value !== ""){
            props.client.publish(`/app/rooms/${id}`, `${Cookies.get("login")}: ${value}`)
        document.getElementById("msg").value = ""
        }
    }

    const handleOdp = () => {
        let value = document.getElementById("odp").value
        if (value.toUpperCase() === gameData.riddles[0].answer.toUpperCase()) {
            axios.put(`http://localhost:5000/rooms/del_riddle/${id}`)
            props.client.publish(`/app/rooms/${id}`, "Wygrałem")
            props.client.publish(`/app/rooms/${id}`, `${Cookies.get("login")}: Zdobywa punkt`)
            document.getElementById("odp").value = ""
            axios.put(`http://localhost:5000/users/${player._id}/add_win`)
            setTimeout(() => {
                axios.get("http://localhost:5000/users").then((response) => {
            setPlayer(response.data.find((user) => user.login === Cookies.get("login")))
                })
            }, 250);
        } else {
            alert('Niepoprawna odpowiedź')
        }
    }

    return (
        <div className="riddle_list_element">
            <h1>Gra - {gameData.name}</h1>
            <ul className="player_list">
                <h3>Gracze uczestniczący w rozgrywce</h3>
            {gameData.players.map((player) => {
                return (
                    <li key={player}>{player}</li>
                )
            })}
            </ul>
            <h1>{gameData.riddles[0].question}</h1>
            <label>Podaj odpowiedź: </label>
            <input type="text" id="odp" />
            <button onClick={() => handleOdp('odp')} id="button" >Wyślij</button>
            <div className="chat">
                <h3>Porozmawiaj z innymi graczami</h3>
                {messages.map((msg) => {
                return (
                    <p className="chatMsg" key={Math.random()}> {msg.text} </p>
                )
            })}
            <input type="text" id="msg" />
        <button onClick={() => handleMsgSent('msg')} id="button" >Wyślij</button>
            </div>
        </div>
    )
}


export default PlayingRoom;