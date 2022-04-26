import { useHistory, withRouter } from "react-router-dom"

const Navbar = () => {

    const history = useHistory()

    return (
        <div className="Navbar">
            <button onClick={() => history.push('/home')}>Strona Głowna</button>
            <button onClick={() => history.push('/rooms')}>Pokoje</button>
            <button onClick={() => history.push('/form/new')}>Dodaj Zagadkę</button>
            <button onClick={() => history.push('/list')}>Lista Zagadek</button>
            <button onClick={() => history.push('/profile')}>Profil</button>
            <button onClick={() => history.push('/leaderboard')}>Tablica Wyników</button>
            <button onClick={() => history.goBack()}>Powrót</button>
        </div>
    )
}


export default withRouter(Navbar)