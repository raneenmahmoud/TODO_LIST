import React from 'react';
import TodoList from './components/TodoList';
import Restore from './components/restore';

const App = () => {
  return (
    <div>
      <TodoList />
      <Restore />
    </div>
  );
};

export default App;
