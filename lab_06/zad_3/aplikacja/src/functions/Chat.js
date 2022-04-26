import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'

const Chat = (props) => {


    const [messages, setMessages] = useState([])

    useEffect(() => {
        props.client.on("message", (topic, message) => {
            message = {text: message.toString()}
            setMessages([...messages, message].slice(-8))
          })
    }, [messages, props.client])

    useEffect(() => {
        axios.get("http://localhost:5000/messages").then(response => {
            setMessages(response.data.slice(-8))
        })
        props.client.publish("app/messages", `Witamy gracza ${Cookies.get("login")}!`)
    }, [props.client])

    const handleMsgSent = () => {
        let value = document.getElementById("msg").value
        if (value !== ""){
            props.client.publish("app/messages", `${Cookies.get("login")}: ${value}`)
        axios.post("http://localhost:5000/messages", {
            text: `${Cookies.get("login")}: ${value}`
        })
        document.getElementById("msg").value = ""
        }
    }

    return(
        <div className="chat">
            {messages.map((msg) => {
                return(
                    <p className="chatMsg" key={Math.random()}> {msg.text} </p>
                )
            })}
            <input type="text" id="msg" />
        <button onClick={() => handleMsgSent('msg')} id="button" >Wyślij</button>
        </div>
    )
}

export default Chat;