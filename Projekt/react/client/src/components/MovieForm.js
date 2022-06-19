import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom"


const MovieForm = () => {

    //dodać możliwość edycji
    const [title, setTitle] = useState("")
    const [releaseYear, setReleaseYear] = useState("")
    const [director, setDirector] = useState("")

    const [dirList, setDirList] = useState([])
   
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id')

    useEffect(() => { 
        axios.get('/app/directors').then((response) => {
            setDirList(response.data)
        })
        if (id !== "new") {
            axios.get(`/app/movies/${id}`).then((response) => {
                setTitle(response.data.title)
                setReleaseYear(response.data.releaseYear)
                setDirector(response.data.director)
            })
        }
    }, [id])

    const handleAddMovie = () => {
        if (title !== "" && releaseYear !== "" && director !== "" && id === "new") {
            axios.post('/app/movies', {title: title, releaseYear: releaseYear, director: director}).then((res) => {
            })
            setTitle("")
            setReleaseYear("")
            setDirector("")
            return id
        }
        if (title !== "" && releaseYear !== "" && director !== "") {
            axios.put('/app/movies', {id: id, title: title, releaseYear: releaseYear, director: director}).then((res) => {
            })
            setTitle("")
            setReleaseYear("")
            setDirector("")
            return id
        }
    }

    return (
        <div>
            <h2>Movie Form</h2>
            <div>
                Title:{' '}
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                Release year:{' '}
                <input type="text" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
                <select onChange={(e) => setDirector(e.target.value)}>
                <option value={director} label="Select a director" />
                {
                    dirList && dirList.map((dir) => {
                        return (
                            <option key={dir._id} value={dir._id}>
                                {dir.name} {dir.surname}
                            </option>
                        )
                    })
                }
                </select>
                <button onClick={() => handleAddMovie()}>Add/Edit Movie</button>
            </div>
        </div>
    )
}


export default MovieForm;