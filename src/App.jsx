/*
  By: José Marcio
  Github: https://github.com/josemarciob
  contact: josemarciob.contato@gmail.com
*/

import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  //Pegando os items gravados no localStorage
  const getDataFromLS = () => {
    const data = localStorage.getItem('tasks');
    if(data) {
      return JSON.parse(data)
    } else {
      return []
    }
  }

  //states novo item / lista de items / user
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(getDataFromLS());
  const [user, setUser] = useState({name: '', avatar: ''})

  //Adicionando um novo item a lista
  function addItem() {
    if(newTask !== '') {
      const task = {
        id: Math.floor(Math.random() * 1000),
        value: newTask,
        status: false,
      };
  
      setTasks((oldList) => [...oldList, task])
      setNewTask("")
    } else {
      return alert('tarefa inválida')
    }
  }

  // Checagem de status do item
  const checkItem = (id) => {
    let taskCheck = tasks.map(task => {
      if(task.id === id) {
       return {...task, status: !task.status}
      }

      return task;
    })

    setTasks(taskCheck);
  }

  //Deletando item da lista pelo ID
  function deleteItem(id) {
    const newArrayItems = tasks.filter(task => task.id !== id)
    setTasks(newArrayItems)
  }

  //Setando items
  //Trazendo user do github
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))

    async function fetchData() {
      const userGitHub = 'josemarciob'
      const response = await fetch(`https://api.github.com/users/${userGitHub}`);
      const data = await response.json();

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();
    
  }, [tasks])

  return (
    <div className="App">
      {/* Header */}
      <header>
       <h1>To do List (React)</h1>

       <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil" />
        </div>
      </header>
      
      {/* Input/Button */}
      <div className="containerInput">

        <div className="addTasks">
          <input 
            type="text" 
            placeholder='Digite a tarefa..'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <button 
            className='add-btn' 
            onClick={() => addItem()}>Adicionar
          </button>
        </div>

      {/* List of Items */}
      <div className="noTasks">
        {tasks.length ? 'Tarefas...' : 'Sem Tarefas...'}
      </div>
      <ul className='listItems'>
        {tasks.map(task => {
          return (
            <li 
              className={task.status === true ? 'done item' : 'item'} 
              key={task.id}>
              {task.value}
              <div className="buttons">
                <button 
                  className='check-btn'
                  onClick={() => checkItem(task.id)}>
                  <i class='bx bx-cool'></i>
                </button>
                <button 
                  className='delete-btn' 
                  onClick={() => deleteItem(task.id)}>
                  <i class='bx bxs-trash'></i>
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      </div>
      
    </div>
  )
  
}

export default App
