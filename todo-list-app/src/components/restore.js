import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

//this method for retreive all data from table todos
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem('token');
  const [showLoginMessage, setShowLoginMessage] = useState(false);

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
    

  const handleRestore = (id) => {
    //listen on restore route api
    fetch(`http://localhost:8000/api/tasks/restore/${id}`, {
    
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-5 p-3 border">
      {showLoginMessage && <h1>Please login first</h1>}
      {!showLoginMessage && (
        <div>
         <h1>Deleted Tasks</h1>
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
            
            if (todo.deleted_at !== null) {
                return (
                <tr key={todo.id}>
                    <td>{todo.title}</td>
                    <td>{todo.decsription}</td>
                    <td>
                    <Link to="/tasks">
                      <button className="btn btn-info mx-3" 
                        onClick={() => handleRestore(todo.id)}>
                        <FontAwesomeIcon icon={faUndo} />
                    </button>
                    </Link>
                    </td>
                </tr>
                );
            } else {
                return null; // Skip rendering the row if it's not soft deleted
            }
        })}

        </tbody>
      </table>
      <Link to="/back" className="btn btn-info mx-2">
            Back
        </Link>
        </div>
      )}
    </div>
  );
};

export default TodoList;
