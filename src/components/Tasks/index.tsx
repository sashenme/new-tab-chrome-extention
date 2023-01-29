import React, { useEffect, useState } from "react";
import {
  completeTask,
  createNewTask,
  deleteTask,
  getTaskList,
  getTasksByList,
} from "../../actions/tasksAction";
import CompletedTasks from "./CompletedTasks";
import NewTask from "./NewTask";
import NoAuth from "./NoAuth";
import PendingTasks from "./PendingTasks";

const Tasks = () => {
  const [taskList, setTaskList] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
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
        chrome.storage.sync.set({ tasks: {accessToken: token} }, () => {
          console.log('token saved')
        });
      }
    );
  };

  const loadTaskList = () => {
    getTaskList(accessToken).then((res) => {
      setTaskList(res.items);
      listTasks(res.items[0].id);
    }).catch(() => setAccessToken(null));
  };

  const listTasks = (taskListId: string) => {
    setSelectedTaskList(taskListId);
    if (accessToken) {
      getTasksByList(accessToken, taskListId).then((res) => {
        setTasks(res.items);
      });
    }
  };

  const handleComplete = (task: {id: string, title: string,  status: string,selfLink: string, }) => {
    completeTask(accessToken, task).then(() => {
      setTimeout(
        () => {
          listTasks(selectedTaskList);
        },
        task.status === "completed" ? 0 : 500
      );
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    deleteTask(accessToken, selectedTaskList, taskId).then(() => {
      listTasks(selectedTaskList);
    });
  };

  const newTask = async (e) => {
    e.preventDefault();
    setText("");
    createNewTask(accessToken, selectedTaskList, text).then((res) => {
      listTasks(selectedTaskList);
    });
  };

  useEffect(() => {
    chrome.storage.sync.get(["tasks"]).then((result) => {
      result.tasks && setAccessToken(result.tasks.accessToken)
    });
  }, []);

  useEffect(() => {
    listTasks(selectedTaskList);
  }, [selectedTaskList]);

  useEffect(() => {
    if (accessToken !== null) {
      loadTaskList();
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
                  completeTask={handleComplete}
                  deleteTask={handleDeleteTask}
                />
              </div>
            )}
          </div>
          <div className="row-auto self-end mt-3">
            <CompletedTasks
              tasks={tasks}
              completeTask={handleComplete}
              deleteTask={handleDeleteTask}
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
