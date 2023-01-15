import React, { useEffect, useState } from "react";

const Tasks = () => {
  const [taskList, setTaskList] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskList, setSelectedTaskList]  = useState('');
  const [text, setText] = useState('');
 
  const getAuth = async () => {
    chrome.identity.getAuthToken(
      {
        interactive: true,
      },
      function (token) {
        setAccessToken(token); 
      }
    );
  };

  const getTaskList = () => {
    fetch(
      `https://tasks.googleapis.com/tasks/v1/users/@me/lists?access_token=${accessToken}`
    )
      .then((res) => res.json())
      .then((res) => {
        setTaskList(res.items);
        console.log(res.items);
        listTasks(res.items[0].id)
        setIsLoading(false);
      });
  };

  const listTasks = (taskListId) => {
    setSelectedTaskList(taskListId)
    fetch(
      `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks?access_token=${accessToken}`,
      {
        //  fetch(`https://tasks.googleapis.com/tasks/v1/users/@me/lists/${taskListId}/task?access_token=${accessToken}`,{
        //mode: "cors", // no-cors 
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTasks(res.items);
      });
  };

  const makeNewTaskList = (title) => {
    fetch(
      `https://tasks.googleapis.com/tasks/v1/users/@me/lists?access_token=${accessToken}`,
      {
        method: "POST",
        body: JSON.stringify({ title }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        getTaskList();
      });
  };

  const deleteTaskList = async (listId) => {
    await fetch(
      `https://tasks.googleapis.com/tasks/v1/users/@me/lists/${listId}?access_token=${accessToken}`,
      {
        method: "DELETE",
      }
    ).then(() => {
      getTaskList();
    });
  };

  const clearTaskList = async (listId) => {
    await fetch(
      `https://tasks.googleapis.com/tasks/v1/lists/${listId}/clear?access_token=${accessToken}`,
      {
        method: "POST",
      }
    ).then(() => {
      getTaskList();
    });
  };



  const completeTask = async (task) => {
    console.log(task.selfLink)
    await fetch(`${task.selfLink}?access_token=${accessToken}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: task.id,
        status: task.status === 'completed' ? 'needsAction' : 'completed',
        title: task.title
      })
    }).then(()=>{
      listTasks(selectedTaskList);
            })
  }

  const deleteTask = async (taskId) => {
    fetch(`https://tasks.googleapis.com/tasks/v1/lists/${selectedTaskList}/tasks/${taskId}?access_token=${accessToken}`,{method: 'DELETE'}).then(() => {
      listTasks(selectedTaskList);
    });
  }

  const newTask = async (e) =>{
    e.preventDefault();
    setText('')
    fetch(`https://tasks.googleapis.com/tasks/v1/lists/${selectedTaskList}/tasks?access_token=${accessToken}`, {
    method: 'POST',
    body: JSON.stringify({
      title: text
    })
    }).then(res => res.json())
    .then(res => {
      console.log(res)
      listTasks(selectedTaskList)
    })
  }

  useEffect(() => {
    getAuth();
  }, []);
  useEffect(() => { 
    listTasks(selectedTaskList)
  }, [selectedTaskList]);
  useEffect(() => {
    if (accessToken === null) {
      return;
    }
    getTaskList();
  }, [accessToken]);

  return (
    <div className="text-white text-lg">
      Tasks List
      
      <button
        className="bg-green-400 px-4 py-2 text-white"
        onClick={() => makeNewTaskList("New Title")}
      >
        New List
      </button>
      <br/>
      {taskList &&
      <select onChange={(e) => setSelectedTaskList(e.target.value)} className="text-black">
        {
          taskList.map((list) => (
            <option key={list.id} value={list.id}>
              {list.title}             
            </option>
          ))
        }
        </select>
        }
         <button
                className="p-1 bg-red-400 "
                onClick={() => deleteTaskList(selectedTaskList)}
              >
                Delete selected TaskList
              </button>
      <ol>
        {tasks &&  
        tasks.length > 0 &&
        tasks.filter(task => task.status !== 'completed').map((task) => (<li key={task.id} className="flex justify-between">
         <div> <input type="checkbox" id={`task-${task.id}`} onChange={()=>completeTask(task)} checked={task.status === 'completed'}/> <label htmlFor={`task-${task.id}`}>{task.title}</label></div>
          <button className="bg-red-500 p-2" onClick={()=>deleteTask(task.id)}>delete</button>
        </li>))}
      </ol>

      <h2>Completed Tasks ({tasks && tasks.filter(task => task.status === 'completed').length})</h2>
      <ol>
        {tasks &&  
        tasks.length > 0 &&
        tasks.filter(task => task.status === 'completed').map((task) => (<li key={task.id} className="flex justify-between">
         <div> <input type="checkbox" id={`task-${task.id}`} onChange={()=>completeTask(task)} checked={task.status === 'completed'}/> <label htmlFor={`#task-${task.id}`}>{task.title}</label></div>
          <button className="bg-red-500 p-2" onClick={()=>deleteTask(task.id)}>delete</button>
        </li>))}
      </ol>
      <form  onSubmit={(e)=>newTask(e)}>
        <input type="text" className="text-slate-800" onChange={e => setText(e.target.value)} value={text}/>
        <button type="submit" className="bg-blue-500 px-2 py-1">Submit</button>
      </form>
    </div>
  );
};

export default Tasks;
