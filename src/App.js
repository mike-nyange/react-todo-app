import { useEffect, useState } from 'react';
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'
import './App.css';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false)
  const [allTodos, setTodos] = useState([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setnewDescription] = useState("")
  const [completedTodos, setCompletedTodos] = useState("")

  const handlerAddTodo = () => {
    let NewTodoItem = {
      title:newTitle,
      description: newDescription
    }

    let updatedTodoArr = [... allTodos];
    updatedTodoArr.push(NewTodoItem)
    setTodos(updatedTodoArr)

    // Storing in Local Storage

    localStorage.setItem('todoList', JSON.stringify(updatedTodoArr))
  }


  const handleTodoDelete = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem('todoList', JSON.stringify(reducedTodo))
    setTodos(reducedTodo)
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    // console.log (filteredTodo);

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);    
    setCompletedTodos (updatedCompletedArr);
    handleTodoDelete(index);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (updatedCompletedArr)
    );
     
  }  

  useEffect(() => {
    let savedTodo =  JSON.parse(localStorage.getItem('todoList'));
    let savedCompletedTodo =  JSON.parse(localStorage.getItem('completedTodo'));
    if (savedCompletedTodo) {
      setTodos(savedTodo)
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo)
    }
  }, [])
  
  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter the task title " />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e) => setnewDescription(e.target.value)} placeholder="Enter the Description title " />
          </div>
          <div className='todo-input-item'>
            <button type="button" onClick={handlerAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>

        <div className='button-area'>
          <button className={ `secondaryBtn ${isCompleteScreen===false && 'active'}` } onClick={() => setIsCompleteScreen(false)}> Todo </button>
          <button className={ `secondaryBtn ${isCompleteScreen===true && 'active'}` } onClick={() => setIsCompleteScreen(true)}> completed </button>
        </div>
        <div className='todo-list'>
          {(isCompleteScreen===false && allTodos) && allTodos.map((item, index) => {
            return(
              <div className='todo-list-item' key={index}>
                <div >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleTodoDelete(index)}/>
                  <BsCheckLg onClick={() => handleComplete(index)} className='check-icon'/>
                </div>
              </div>
            )
          })}

          {(isCompleteScreen===true && completedTodos) && completedTodos.map((item, index) => {
            return(
              <div className='todo-list-item' key={index}>
                <div >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>
                  
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleTodoDelete(index)}/>
                  
                </div>
              </div>
            )
          })}
          
        </div>

      </div>
    </div>
  );
}

export default App;
