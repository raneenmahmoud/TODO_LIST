import React from 'react';
import TodoList from './components/TodoList';
import Restore from './components/restore';
import TodoForm from './components/TodoForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
 
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<TodoList/>}/>
      <Route path='/restore' element={<Restore/>}/>
      <Route path="/create" element={<TodoForm />} />
      <Route path="/edit/:id" element={<TodoForm />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
