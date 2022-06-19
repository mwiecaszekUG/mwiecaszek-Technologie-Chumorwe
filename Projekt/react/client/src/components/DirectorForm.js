import { useState } from 'react';
import axios from 'axios';


const DirectorForm = () => {

    const [name, setName] = useState()

    const [surname, setSurname] = useState("")

    const handleAddDirector = () => {
        if (name !== "" && surname !== "") {
            axios.post('/app/directors', {name: name, surname: surname})
            setName("")
            setSurname("")
        }
    }

    return (
        <div>
            <div>
                Name:{' '}
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                Surname:{' '}
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                <button onClick={() => handleAddDirector()}>Add Director</button>
            </div>
        </div>
    )
}


export default DirectorForm;