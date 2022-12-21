import { useState } from 'react';
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'
import './App.css';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false)
  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' placeholder="Enter the task title " />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' placeholder="Enter the Description title " />
          </div>
          <div className='todo-input-item'>
            <button type="button" className='primaryBtn'>Add</button>
          </div>
        </div>

        <div className='button-area'>
          <button className={ `secondaryBtn ${isCompleteScreen===false && 'active'}` } onClick={() => setIsCompleteScreen(false)}> Todo </button>
          <button className={ `secondaryBtn ${isCompleteScreen===true && 'active'}` } onClick={() => setIsCompleteScreen(true)}> completed </button>
        </div>
        <div className='todo-list'>
          <div className='todo-list-item'>
            <h3>Task 1</h3>
            <p>Description</p>
            <div>
            <AiOutlineDelete className='icon'/>
            <BsCheckLg className='check-icon'/>
          </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}

export default App;
