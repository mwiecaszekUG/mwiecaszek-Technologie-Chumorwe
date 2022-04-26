import { useEffect, useState } from "react";
import axios from 'axios'

const Leaderboard = (props) => {

    const [leaders, setLeaders] = useState([])


    const [header, setHeader] = useState(<h1>Tablica wyników</h1>)

    const [change, setChange] = useState(0)

    const [searchBar, setSearchBar] = useState(<div></div>)

    useEffect(() => {
        axios.get('http://localhost:5000/users').then((response) => {
            setLeaders(response.data.sort((a, b) => {
                return b.wins - a.wins
            }).slice(0,3))
        })
        
    }, [change])

    const [button, setButton] = useState(<button onClick={() => hadnleSearch()}>Szukaj graczy</button>)

    const hadnleSearch = async () => {
        setHeader(<h1>Lista graczy</h1>)
        await axios.get('http://localhost:5000/users').then((response) => {
            setLeaders(response.data)
            
        })
        setSearchBar(<input type="text" id="search" onChange={() => handleInput()}></input>)
        setButton(<button onClick={() => hadnleLeader()}>Tablica wyników</button>)
    }

    const hadnleLeader = () => {
        setChange(Math.random())
        setHeader(<h1>Tablica wyników</h1>)
        setButton(<button onClick={() => hadnleSearch()}>Szukaj graczy</button>)
        setSearchBar(<div></div>)
    }

    const handleInput = () => {
        let value = document.getElementById("search").value
        if (value !== "") {
            setLeaders(props.allPlayers.filter(player => {
                return player.login.toUpperCase().includes(value.toUpperCase())
            }))
        } else {
            setLeaders(props.allPlayers)
        }
    }

    
    return (
        <div className="riddle_list_element">
            {header}
            {searchBar}
            {leaders.map((player) => {
                return(
                    <h2 key={player.login}>{player.login} z {player.wins} wygranymi</h2>
                )      
            })}
            {button}
        </div>
    )
}

export default Leaderboard;