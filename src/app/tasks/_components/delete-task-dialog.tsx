// components/tasks/delete-task-dialog.tsx
"use client"

import { useState } from "react"
import { deleteTask } from "@/actions/task"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function DeleteTaskDialog({ taskId }) {
  const [open, setOpen] = useState(false)

  
  async function handleDelete() {
    const promise = deleteTask(taskId)
    toast.promise(promise, {
      loading: "Deleting task...",
      success: "Task deleted",
      error: "Failed to delete task",
    })
    await promise
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>

        <p>Are you sure you want to delete this task?</p>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}