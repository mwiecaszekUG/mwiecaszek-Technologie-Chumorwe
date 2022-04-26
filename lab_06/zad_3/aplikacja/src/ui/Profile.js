import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import {Formik, Form, Field} from "formik"
import { useHistory } from "react-router-dom";

const Profile = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        login: "",
        wins: ""
    })

    const [form, setForm] = useState(<div></div>)

    const handleSubmit = (values) => {
        if (values.old === user.password) {
            alert("Zmieniono hasło")
            setForm(<div></div>)
            const newData = user
            newData.password = values.new
            axios.put(`http://localhost:5000/users/${user._id}`, newData)
        } else {
            alert("Niepoprawne hasło")
        }
        
    }

    const handleDelete = () => {
        alert("Usunięto konto")
        axios.delete(`http://localhost:5000/users/${user._id}`)
        history.push("")
    }

    const handleForm = () => {
        setForm(<div><Formik
            onSubmit={(values) => handleSubmit(values)}
            initialValues={{
                new: "",
                old: ""
            }}
            enableReinitialize={true}
            >
          
              <Form>
                <label>Stare hasło: </label><Field type="password" name="old" />
                <label>Nowe hasło: </label><Field type="password" name="new" />
                <button type="submit">Zmień hasło</button>
              </Form>
            </Formik>
            <button onClick={() => handleDelete()}>Usuń konto</button>
            </div>)
    }

    

    useEffect(() => {
        axios.get("http://localhost:5000/users").then((response) => {
            setUser(response.data.find((user) => user.login === Cookies.get("login")))
        })
    }, [])

    return (
        <div className="riddle_list_element">
            <h2>Zalogowano jako {user.login}</h2>
            <h2>Masz {user.wins} wygranych na swoim koncie</h2>
            <button onClick={() => {handleForm()}}>Edytuj profil</button>
            {form}
        </div>
    )
}

export default Profile;