import './App.css';
import Header from './components/Header';
import { Footer } from './components/Footer';
import { Todos } from './components/Todos';
import { AddTodo } from './components/AddTodo';
import { About } from './components/About';
import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  let initTodo;
  if(localStorage.getItem("todos") === null ){
    initTodo = []
  }else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo)=>{
    console.log("I am onDelete.", todo);
    // Deleting this way in react will not work
    // let index = todos.indexOf(todo);
    // todos.splice(index,1);
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }))
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo = (title, desc)=> {
    console.log("I am adding this todo,",title,desc);
    let id;
    if(todos.length == 0){
      id = 1;
    }else{
      id = todos[todos.length-1].id + 1;
    }
    const myTodo = {
      id: id,
      title: title,
      desc: desc
    }
    console.log(myTodo);
    setTodos([...todos,myTodo]);
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  
  return (
    <>
      <Router>
        <Header title= "My Todos App" searchBar={false}/>

        <Routes>
          <Route path="/" element={
            <>
              <AddTodo addTodo={addTodo}/>
              <Todos todos={todos} onDelete={onDelete}/>
            </>
          }>
          </Route>
          <Route path="/about" element={<About />}>
          </Route>
        </Routes>

        <Footer/>
      </Router>
    </>
  );
}

export default App;
