import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const token = localStorage.getItem('token');
const TodoForm = () => {
  const { id } = useParams();
  const ID = localStorage.getItem('ID');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userid, setUserID] = useState(ID);

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
          setDescription(data.data.description);
          setUserID(data.data.userid);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);


  const handleSubmit = (event) => {
    event.preventDefault();

    const todoData = { title, description, userid: ID };
      console.log(todoData)
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
          setUserID('');
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
          setUserID('');
        })
        .catch((error) => console.log(error));
    }
    if (!ID) {
      showAlert();
    }
  };

  const showAlert = () => {
    const alertElement = document.getElementById('alert');

    if (alertElement) {
      alertElement.classList.remove('d-none');
    }
  };

  return (
    <div className="container mt-5 p-3 border">
      <h2>{id ? 'Edit' : 'Add'} To-Do Task</h2>
      <div id="alert" className="alert alert-danger d-none" role="alert">
        Please log in first
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label>UserID:</label>
          <input
            type="text"
            className="form-control"
            value={userid}
            readOnly
          />
        </div>
        <div className='d-flex justify-content-between'>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Save'}
        </button>
          <Link to="/back" className="btn btn-secondary mx-2">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
