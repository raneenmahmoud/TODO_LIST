import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const token = localStorage.getItem('token');
const TodoForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id) {
      // Fetch task data for editing
      fetch(`http://localhost:8000/api/tasks/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.data.title);
          setDescription(data.data.decsription);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const todoData = { title, description };

    if (id) {
      // Update existing task
      
      fetch(`http://localhost:8000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(todoData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTitle('');
          setDescription('');
        })
        .catch((error) => console.log(error));
    } else {
      // Create new task
      fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(todoData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTitle('');
          setDescription('');
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="container mt-5 p-3 border">
      <h2>{id ? 'Edit' : 'Add'} To-Do Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={handleDescriptionChange}
            rows="3"
          />
        </div>
        <div className='d-flex justify-content-between'>
        <button type="submit">{id ? 'Update' : 'Save'}</button>
        <Link to="/back" className="btn btn-info mx-2">
            Back
        </Link>
        </div>
        
      </form>
      
    </div>
  );
};

export default TodoForm;
