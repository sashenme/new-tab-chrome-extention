import React, { useEffect, useState } from "react";
import CompletedTasks from "./CompletedTasks";
import NewTask from "./NewTask";
import NoAuth from "./NoAuth";
import PendingTasks from "./PendingTasks";

const Tasks = () => {
  const [taskList, setTaskList] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskList, setSelectedTaskList] = useState("");
  const [text, setText] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

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
        listTasks(res.items[0].id);
        setIsLoading(false);
      });
  };

  const listTasks = (taskListId) => {
    setSelectedTaskList(taskListId);
    if (accessToken) {
      fetch(
        `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks?access_token=${accessToken}`
      )
        .then((res) => res.json())
        .then((res) => { 
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
    await fetch(`${task.selfLink}?access_token=${accessToken}`, {
      method: "PUT",
      body: JSON.stringify({
        id: task.id,
        status: task.status === "completed" ? "needsAction" : "completed",
        title: task.title,
      }),
    }).then(() => {
      setTimeout(
        () => {
          listTasks(selectedTaskList);
        },
        task.status === "completed" ? 0 : 500
      );
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
    }
  }, [accessToken]);

  return (
    <div className="text-white text-lg grid bg-gradient-to-bl from-slate-400/40 to-slate-100/20 pt-8 pb-4 rounded-md backdrop-blur-sm max-w-[768px] border-solid border border-white/20 ml-auto ">
      {accessToken ? (
        <>
          <div className="">
            {taskList && (
              <div className="px-6 pb-4">
                <h1 className="text-3xl font-semibold">Google Tasks</h1>
                <select
                  onChange={(e) => setSelectedTaskList(e.target.value)}
                  className="text-gray-100 bg-transparent"
                >
                  {taskList.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {!showCompleted && (
              <div className="flex flex-col items-between h-[34vh]">
                <PendingTasks
                  tasks={tasks}
                  completeTask={completeTask}
                  deleteTask={deleteTask}
                />
              </div>
            )}
          </div>
          <div className="row-auto self-end mt-3">
            <CompletedTasks
              tasks={tasks}
              completeTask={completeTask}
              deleteTask={deleteTask}
              showCompleted={showCompleted}
              onClick={() => setShowCompleted(!showCompleted)}
              className={`row-auto border-y border-white/20  ${
                showCompleted ? "h-[40vh] 2xl:h-[45vh]" : ""
              }`}
            />
            <NewTask
              onSubmit={(e) => newTask(e)}
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </div>
        </>
      ) : (
        <NoAuth getAuth={() => getAuth()} />
      )}
    </div>
  );
};

export default Tasks;
