import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie'


const Comments = (props) => {

    const id = useParams().id
    
    const [riddle, setRiddle] = useState("Zagadka")
    const [comments, setComments] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/riddles/${id}`).then((response) => {
            setRiddle(response.data.question)
            setComments(response.data.comments)
        })

        props.client.subscribe(`/app/comments/${id}`)
        
    }, [id, props.client])

    props.client.on("message", (topic, message) => {
        message = {text: message.toString()}
        setComments([...comments, message.text])
      })

    const handleComment = () => {
        let value = document.getElementById("msg").value
        if (value !== ""){
            props.client.publish(`/app/comments/${id}`, `${Cookies.get("login")}: ${value}`)
        axios.post(`http://localhost:5000/riddles/comments/${id}`, {
            comment: `${Cookies.get("login")}: ${value}`
        })
        document.getElementById("msg").value = ""
        }
    }
    
    return (
        <div className="riddle_list_element">
            <h3 className="Head">{riddle}</h3>
            {comments.map((com) => {
                return (
                    <p className="comment"  key={com}>{com}</p>
                )
            })}
             <input type="text" id="msg" />
        <button onClick={() => handleComment('msg')} id="button" >Komentuj</button>
        </div>
    )
}


export default Comments;