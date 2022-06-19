import { useEffect, useState } from 'react';
import axios from 'axios';


const Todos = () => {

    const [todos, setTodos] = useState([])

    const [newTodo, setNewTodo] = useState("")

    useEffect(() => {
        setInterval(() => axios.get('/app/todos').then((response) => {
            setTodos(response.data)
        }), 1000)
    }, [])

    const handleAddTodo = () => {
        if (newTodo !== "") {
            axios.post('/app/todos', {todo: newTodo})
            setNewTodo("")
        }
    }

    return (
        <div id="todos">
            <h2>Todo List</h2>
            <div>
                {todos.map((todo) => {
                    return (
                        <div key={todo}>{todo}</div>
                    )
                })}
            </div>
            <div>
                Todo:{' '}
                <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                <button onClick={() => handleAddTodo()}>Add Todo</button>
            </div>
        </div>
    )
}


export default Todos;