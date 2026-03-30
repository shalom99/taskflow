
import { EditTaskDialog } from "./edit-task-dialog"
import { DeleteTaskDialog } from "./delete-task-dialog"

export function TaskList({ tasks }) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="border p-3 rounded-lg flex justify-between items-start"
        >
          <div>
            <div className="font-medium">{task.title}</div>
            {task.description && (
              <div className="text-sm text-muted-foreground">
                {task.description}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <EditTaskDialog task={task} />
            <DeleteTaskDialog taskId={task.id} />
          </div>
        </li>
      ))}
    </ul>
  )
}