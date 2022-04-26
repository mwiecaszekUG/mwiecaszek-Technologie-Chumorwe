import Cookies from 'js-cookie'
import { useEffect, useState } from "react"
import {Formik, Form, Field} from "formik"
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const LoginForm = () => {

    const history = useHistory()

    const [users, setUsers] = useState([])

    const [form, setForm] = useState(<div></div>)

    useEffect(() => {
        axios.get("http://localhost:5000/users").then((response) => {
            setUsers(response.data)
        })
    }, [])
    
  const handleSubmit = async (values) => {
      let userExist = false
      if (users.find((user) => user.login === values.login)) {
        userExist = true
      }
      if (userExist) {
          const user = users.find((user) => user.login === values.login)
          if (user.password === values.password) {
            Cookies.set("login", values.login)
            history.push("/home")
          } else {
              alert("Niepoprawne hasło")
          }
      } else {
            alert("Niepoprawny login")
      }
      
  }

  const handleSubmit2 = async (values) => {
    let userExist = false
    if (users.find((user) => user.login === values.login)) {
      userExist = true
    }
    if (userExist) {
        alert("Dany użytkownik już istnieje")
    } else {
      if (values.password === values.repeat) {
        Cookies.set("login", values.login)
          axios.post("http://localhost:5000/users", {
              login: values.login,
              password: values.password
          })
          alert("Utworzono użytkownika")
          history.push("/home")
      } else {
        alert("Hasła nie są identyczne")
      }
    }
}

  const handleLogin = () => {
    setForm(<Formik
      onSubmit={(values) => handleSubmit(values)}
      initialValues={{
          login: Cookies.get("login"),
          password: ""
        }}
      enbaleReinitialize={true}>
    
        <Form>
          <Field type="string" name="login" />
          <Field type="password" name="password" />
          <button type="submit">Potwierdź</button>
        </Form>
      </Formik>)
  }

  const handleRegister = () => {
    setForm(<Formik
      onSubmit={(values) => handleSubmit2(values)}
      initialValues={{
          login: "",
          password: "",
          repeat: ""
        }}
      enbaleReinitialize={true}>
    
        <Form>
          <Field type="string" name="login" />
          <Field type="password" name="password" />
          <Field type="password" name="repeat" />
          <button type="submit">Potwierdź</button>
        </Form>
      </Formik>)
  }

    return (
        <div>
          <button onClick={() => {handleLogin()}}>Zaloguj się</button>
          <button onClick={() => {handleRegister()}}>Zerejestruj się</button>
            
    {form}
        </div>
    
    )
}

export default LoginForm;