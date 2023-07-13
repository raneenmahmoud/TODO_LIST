import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch the To-Do list from the backend API
    fetch('http://localhost:8000/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        // Convert data to an array if it's not already with the same elements od data
        const dataArray = Array.isArray(data.data) ? data.data : Array.from(data.data);
        console.log("type of dataArray", Array.isArray(dataArray) ? "array" : typeof dataArray);
        setTodos(dataArray);
      })
      .catch((error) => console.log(error));
  }, []);

//to show updated values of todos
//   useEffect(() => {
//     console.log(todos);
//   }, [todos]);

return (
    <div className='container mt-5 p-3'>
      <h1>To-Do List</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.decsription}</td>
              <td>
                <a className="btn btn-info mx-3">
                    <FontAwesomeIcon icon={faEdit} />
                </a>
                <a className="btn btn-danger">
                <FontAwesomeIcon icon={faTrash} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
