import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const MovieList = () => {

    const [movies, setMovies] = useState([])
    const [dirs, setDirs] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/app/directors').then((res) => {
            setDirs(res.data)
        })

        axios.get('/app/movies').then((res) => {
            setMovies(res.data)
        })
    }, [])

    const handleMovieDelete = (id) => {
        axios.delete(`/app/movies?id=${id}`).then((res) => {
            setMovies(movies.filter((el) => el.id !== id))
        })
    }

    const handleMovieEdit = (id) => {
        navigate(`/movieForm?id=${id}`)
    }

    const findDir = (id) => {
        const dir = dirs.filter((el) => el._id === id)
        return `${dir[0].name} ${dir[0].surname}`
    }

    return (
        <div>
            <h2>Movie List</h2>
            <div>
                {movies.map((el) => {
                    return (
                        <div key={el.id}>
                            Title: {el.title} <br />
                            Release year: {el.releaseYear} <br />
                            Director: {findDir(el.director)} <br />
                            <button onClick={() => handleMovieEdit(el.id)}>Edit Movie</button> <br />
                            <button onClick={() => handleMovieDelete(el.id)}>Delete Movie</button> <br />
                            <br />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default MovieList;
