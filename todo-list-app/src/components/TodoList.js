// TodoList.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faUndo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        const dataArray = Array.isArray(data.data) ? data.data : Array.from(data.data);
        setTodos(dataArray);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-5 p-3 border">
      <div className='d-flex justify-content-between'>
        <h1>To-Do List</h1>
        <div>
          <Link to="/create" className="btn btn-success mx-2">
            <FontAwesomeIcon icon={faPlus} /> Create New Task
          </Link>
          <Link to="/restore" className="btn btn-dark mx-2">
            <FontAwesomeIcon icon={faUndo} /> All Deleted Tasks
          </Link>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            if (todo.deleted_at === null) {
              return (
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>{todo.decsription}</td>
                  <td>
                    <Link to={`/edit/${todo.id}`} className="btn btn-info mx-3">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <a className="btn btn-danger" onClick={() => handleDelete(todo.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </a>
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
