import axios from "axios"
import {Formik, Form, Field} from "formik"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"

const MysteryForm = () => {

    const history = useHistory()

    const url = useParams()

    const [id, setId] = useState(url.id)

    const [formData, setFormData] = useState({
        _id: id,
        question: "",
        answer: ""
    })
    

    useEffect(() => {
        if (url.id === "new") {
            axios.get("http://localhost:5000/riddles").then(response => {
            setId(response.data.slice(-1)[0]._id + 1)
        })
        } else {
             axios.get(`http://localhost:5000/riddles/${url.id}`).then((response) => {
            setFormData(response.data)
        })
        }
    }, [url])

    const handleSubmit = (values) => {
        if (id !== url.id) {
            axios.post("http://localhost:5000/riddles", {
            _id: id,
            question: values.question,
            answer: values.answer
        })
        
        } else {
            axios.put(`http://localhost:5000/riddles/${id}`, {
            _id: id,
            question: values.question,
            answer: values.answer
        })}
        history.push("/home")
    }
    
    return (
        <div className="riddle_list_element">
            
            <Formik
  onSubmit={(values) => handleSubmit(values)}
  initialValues={formData}
  enableReinitialize={true}
  >

    <Form>
      <label>Treść: </label><Field name="question" />
      <label>Odpowiedź: </label><Field name="answer" />
      <button type="submit">Dodaj/Edytuj zagadkę</button>
    </Form>
  </Formik>

        </div>
    )
}

export default MysteryForm;