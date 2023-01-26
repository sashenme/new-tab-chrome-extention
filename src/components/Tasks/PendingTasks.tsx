import React from 'react'
import NoTasks from './NoTasks'
import TaskItem from './TaskItem'

const PendingTasks = ({tasks, completeTask, deleteTask}) => {
  return (
    <div className="flex flex-col px-6 overflow-y-auto pb-4 h-full">
              {tasks && tasks.length > 0 ? (
                tasks.filter((task) => task.status !== "completed").length >
                0 ? (
                  tasks
                    .filter((task) => task.status !== "completed")
                    .map((task) => (
                      <TaskItem
                        key={task.id}
                        id={`task-${task.id}`}
                        title={task.title}
                        checked={task.status === "completed"}
                        onComplete={() => completeTask(task)}
                        onDelete={() => deleteTask(task.id)}
                      />
                    ))
                ) : (
                  <NoTasks
                    title="All tasks complete"
                    description="Nice work!"
                  />
                )
              ) : (
                <NoTasks title="No tasks for this list" />
              )}
            </div>
  )
}

export default PendingTasks