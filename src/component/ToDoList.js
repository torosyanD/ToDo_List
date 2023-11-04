import React, { useEffect, useState } from "react";

const page = 5

const ToDoList = () => {
    const [todos, setTodos] = useState([])
    const [task, setTask] = useState("")
    const [editIndex, setEditIndex] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos")) || []
        setTodos(storedTodos)
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    const addTodos = () => {
        if (task.trim() !== "") {
            if (editIndex === null) {
                setTodos([...todos, task])
            } else {
                todos[editIndex] = task
                setTodos([...todos])
                setEditIndex(null)
            }
            setTask("")
        }
    }

    const editTodo = (index) => {
        setTask(todos[index]);
        setEditIndex(index);
    }

    const deleteTodo = (index) => {
        const updateTodos = todos.filter((_, i) => i !== index)
        setTodos(updateTodos)
    }

    const totalPages = Math.ceil(todos.length / page)
    const paginatedTodos = todos.slice(
        (currentPage - 1) * page,
        currentPage * page
    )

    return (
        <div className="dv1">
            <h1>Todo List</h1>
            <input
                className="inp1"
                type="text"
                placeholder="Add Task or edit Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />

            <button className="btn1" onClick={addTodos}>{editIndex === null ? "Add" : "Update"}</button>
            <ul >
                {
                    paginatedTodos.map((todo, index) => (
                        <li key={index}>
                             {todo}
                            <button className="btn11" onClick={() => editTodo(index)}>Edit</button>
                            <button className="btn22" onClick={() => deleteTodo(index)}>X</button>
                        </li>
                    ))
                }
            </ul>
            <div>
                <button className="btnnp" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                <span>{currentPage}</span>
                <button className="btnnp" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
        </div>
    )
}

export default ToDoList