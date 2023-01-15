import React, { useEffect, useState } from "react";
import NewTask from "./NewTask";
import TaskItem from "./TaskItem";

const Tasks = () => {
  const [taskList, setTaskList] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskList, setSelectedTaskList] = useState("");
  const [text, setText] = useState("");

  const getAuth = async () => {
    chrome.identity.getAuthToken(
      {
        interactive: true,
      },
      function (token) {
        setAccessToken(token);
        console.log("hehe", token);
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
        listTasks(res.items[0].id);
        setIsLoading(false);
      });
  };

  const listTasks = (taskListId) => {
    setSelectedTaskList(taskListId);
    if (accessToken) {
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
    }
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
    console.log(task.selfLink);
    await fetch(`${task.selfLink}?access_token=${accessToken}`, {
      method: "PUT",
      body: JSON.stringify({
        id: task.id,
        status: task.status === "completed" ? "needsAction" : "completed",
        title: task.title,
      }),
    }).then(() => {
      listTasks(selectedTaskList);
    });
  };

  const deleteTask = async (taskId) => {
    fetch(
      `https://tasks.googleapis.com/tasks/v1/lists/${selectedTaskList}/tasks/${taskId}?access_token=${accessToken}`,
      { method: "DELETE" }
    ).then(() => {
      listTasks(selectedTaskList);
    });
  };

  const newTask = async (e) => {
    e.preventDefault();
    setText("");
    fetch(
      `https://tasks.googleapis.com/tasks/v1/lists/${selectedTaskList}/tasks?access_token=${accessToken}`,
      {
        method: "POST",
        body: JSON.stringify({
          title: text,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        listTasks(selectedTaskList);
      });
  };

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    listTasks(selectedTaskList);
  }, [selectedTaskList]);

  useEffect(() => {
    if (accessToken !== null) {
      getTaskList();
      console.log(accessToken);
    }
  }, [accessToken]);

  return (
    <div className="text-white text-lg bg-gradient-to-bl from-slate-300/30 to-slate-100/10 py-8 rounded-md backdrop-blur-sm max-w-[768px] border-solid border border-white/20 ml-auto">
      {accessToken ? (
        <div>
          {taskList && (
            <div className="px-6">
              <h1 className="text-3xl font-semibold">Google Tasks</h1>
              <select
                onChange={(e) => setSelectedTaskList(e.target.value)}
                className="text-gray-100 bg-transparent "
              >
                {taskList.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* <button
            className="bg-green-400 px-4 py-2 text-white"
            onClick={() => makeNewTaskList("New Title")}
          >
            New List
          </button> */}
          {/*          
          <button
            className="p-1 bg-red-400 "
            onClick={() => deleteTaskList(selectedTaskList)}
          >
            Delete selected TaskList
          </button> */}
          <div className="grid px-6 pt-8">
            {tasks &&
              tasks.length > 0 &&
              tasks
                .filter((task) => task.status !== "completed")
                .map((task) => (
                  <TaskItem
                    id={`task-${task.id}`}
                    title={task.title}
                    checked={task.status === "completed"}
                    onComplete={() => completeTask(task)}
                    onDelete={() => deleteTask(task.id)}
                  />
                ))}
          </div>
          <div className="px-6 py-4">
            <h2>
              Completed Tasks (
              {tasks &&
                tasks.filter((task) => task.status === "completed").length}
              )
            </h2>
            <div className="grid">
              {tasks &&
                tasks.length > 0 &&
                tasks
                  .filter((task) => task.status === "completed")
                  .map((task) => (
                    <TaskItem
                      id={`task-${task.id}`}
                      title={task.title}
                      checked={task.status === "completed"}
                      onComplete={() => completeTask(task)}
                      onDelete={() => deleteTask(task.id)}
                    />
                  ))}
            </div>
            <NewTask
            onSubmit={(e) => newTask(e)}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          </div>
         
        </div>
      ) : (
        <button
          className="px-2 py-1 flex bg-amber-500"
          onClick={() => getAuth()}
        >
          Authenticate
        </button>
      )}
    </div>
  );
};

export default Tasks;
