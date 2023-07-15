import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faUndo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const TodoList = () => {
  //get items from local storage
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem('token');
  const ID = localStorage.getItem('ID');
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  
  // useEffect hook to handle login message and fetch tasks based on the 'token' dependency
  useEffect(() => {
    if (!token) {
      setShowLoginMessage(true); // Display the login message
    } else {
      setShowLoginMessage(false); // Hide the login message
      fetch('http://localhost:8000/api/tasks', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const dataArray = Array.isArray(data.data) ? data.data : Array.from(data.data);
          setTodos(dataArray);
        })
        .catch((error) => console.log(error));
    }
  }, [token]);
  
  //when delete task
  const handleDelete = (id) => {

    fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
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
      
      {/* don't have token in local storage */}
      {showLoginMessage && <Link to="/"><h1>Please register first</h1></Link>}

      {/* have token in local storage */}
      {!showLoginMessage && (
        <div>
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
              {/* loop todos array with map and filter it according deleting task*/}
              {todos.map((todo) => {
                if (todo.deleted_at === null && todo.userid == ID) {
                  return (
                    <tr key={todo.id}>
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>
                        <Link to={`/edit/${todo.id}`} className="btn btn-info mx-3">
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
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
      )}
    </div>
  );
};

export default TodoList;
