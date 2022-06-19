import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <div id="navbar">
            <h3 id="navComp" onClick={() => navigate('/movieList')}>Movie List</h3>
            <h3 id="navComp" onClick={() => navigate('/movieForm?id=new')}>Movie Form</h3>
            <h3 id="navComp" onClick={() => navigate('/directorForm')}>Director Form</h3>
        </div>
    )
}

export default Navbar;