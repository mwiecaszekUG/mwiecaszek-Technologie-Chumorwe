import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

const MysteryList = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        login: "",
        wins: "",
        role: ""
    })

    useEffect(() => {
        axios.get("http://localhost:5000/users").then((response) => {
            setUser(response.data.find((user) => user.login === Cookies.get("login")))
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/riddles').then((response) => {
            setRiddlesList(response.data)
        })
        
    }, [])

    const [riddlesList, setRiddlesList] = useState([])

    const handleDelete = (id) => {
        if (user.role === "admin") {
            axios.delete(`http://localhost:5000/riddles/${id}`)
        setRiddlesList(riddlesList.filter((riddle) => riddle._id !== id))
        } else {
            alert('Brak uprawnień')
        }
    }

    const handleEdit = (riddle) => {
        if (user.role === "admin") {
            history.push(`/form/${riddle._id}`)
        } else {
            alert('Brak uprawnień')
        }
    }

    return (
        <div>
            <h1>Lista zagadek</h1>
            {
                riddlesList && riddlesList.map((riddle) => {
                    return (
                        <div className='riddle_list_element' key={riddle._id}>
                            <p onClick={() => history.push(`/riddles/${riddle._id}`)}>{riddle.question}</p> <button onClick={() => handleDelete(riddle._id)}>Usuń</button>
                            <button onClick={() => handleEdit(riddle)}>Edytuj</button>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default MysteryList;