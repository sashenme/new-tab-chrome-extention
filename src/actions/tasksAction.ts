
import { googleTaskApi } from "../utils/apis";

// TaskLists API Actions
export const makeNewTaskList = async (accessToken: string, title: string) => {
  return await fetch(
    `${googleTaskApi}/users/@me/lists?access_token=${accessToken}`,
    {
      method: "POST",
      body: JSON.stringify({ title }),
    }
  ).then((res) => res.json())
};

export const deleteTaskList = async (accessToken: string, listId: string) => {
  return await fetch(
    `${googleTaskApi}/users/@me/lists/${listId}?access_token=${accessToken}`,
    {
      method: "DELETE",
    }
  );
};

export const clearTaskList = async (accessToken: string, listId: string) => {
  return await fetch(
    `${googleTaskApi}/lists/${listId}/clear?access_token=${accessToken}`,
    {
      method: "POST",
    }
  );
};

export const getTaskList = async (accessToken: string) => {
  return await fetch(
    `${googleTaskApi}/users/@me/lists?access_token=${accessToken}`
  ).then((res) => res.json())

};

// Tasks API Actions
export const getTasksByList = async (accessToken: string, listId: string) => {
  return await fetch(
    `${googleTaskApi}/lists/${listId}/tasks?access_token=${accessToken}`
  ).then((res) => res.json())
};

export const createNewTask = async (accessToken: string, listId: string, text: string) => {
  return await fetch(
    `${googleTaskApi}/lists/${listId}/tasks?access_token=${accessToken}`,
    {
      method: "POST",
      body: JSON.stringify({
        title: text,
      }),
    }
  ).then((res) => res.json());
};

export const completeTask = async (accessToken: string, task: any) => {
  return await fetch(`${task.selfLink}?access_token=${accessToken}`, {
    method: "PUT",
    body: JSON.stringify({
      id: task.id,
      status: task.status === "completed" ? "needsAction" : "completed",
      title: task.title,
    }),
  });
};

export const deleteTask = async (accessToken: string, listId: string, taskId: string) => {
  return await fetch(
    `${googleTaskApi}/lists/${listId}/tasks/${taskId}?access_token=${accessToken}`,
    { method: "DELETE" }
  );
};