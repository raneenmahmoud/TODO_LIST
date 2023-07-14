import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log(data); // Handle the response data
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.access_token); // Store the token in local storage
        console.log('Login successful');
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container mt-5 p-3 border'>
      <h1 className='mb-5'>Click Register First then click Login</h1>
      <h2>Register</h2>
      <input type="text" value={name} 
      onChange={(e) => setName(e.target.value)} 
      placeholder="Name" className='m-4'/>

      <input type="email" value={email} 
      onChange={(e) => setEmail(e.target.value)} 
      placeholder="Email" className='m-4'/>

      <input type="password" value={password} 
      onChange={(e) => setPassword(e.target.value)} 
      placeholder="Password" className='m-4'/>

      <button onClick={handleRegister} className='m-5'>Register</button>

      <h2>Login</h2>
      <input type="email" value={email} 
      onChange={(e) => setEmail(e.target.value)} 
      placeholder="Email" className='m-4'/>

      <input type="password" value={password} 
      onChange={(e) => setPassword(e.target.value)} 
      placeholder="Password" className='m-4'/>

      <Link to="/tasks"><button onClick={handleLogin} className='m-5'>Login</button></Link>
    </div>
  );
};

export default AuthComponent;
