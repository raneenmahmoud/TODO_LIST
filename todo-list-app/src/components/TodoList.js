import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    //connect to the route of index
    fetch('http://localhost:8000/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        //convert retreived data as object to arra with the same elements
        const dataArray = Array.isArray(data.data) ? data.data : Array.from(data.data);
        setTodos(dataArray);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    //listen on delete route api
    fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Handle the response data
        //get todos after the successful deletion after filtering todos by specific id
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-5 p-3 border">
        <div className='d-flex justify-content-between'>
            <h1>To-Do List</h1>
            <div>

            <a className="btn btn-success mx-2">
                <FontAwesomeIcon icon={faPlus} /> Create New Task
            </a>
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
                return(
                    <tr key={todo.id}>
                    <td>{todo.title}</td>
                    <td>{todo.decsription}</td>
                    <td>
                        <a className="btn btn-info mx-3">
                        <FontAwesomeIcon icon={faEdit} />
                        </a>
                        <a className="btn btn-danger" 
                        onClick={() => handleDelete(todo.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                        </a>
                    </td>
                    </tr>
                );
            } else {
                return null; // Skip rendering the row if it's not soft deleted
            }
  
        })}
          
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
