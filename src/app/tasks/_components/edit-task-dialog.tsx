// components/tasks/edit-task-dialog.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { updateTask } from "@/actions/task"
import { createTaskSchema, CreateTaskInput } from "@/lib/validators/task"

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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Task } from "../../../../generated/prisma/client"

type EditTaskDialogProps = {
  task: Task  
}


export function EditTaskDialog({ task }: EditTaskDialogProps) {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description ?? "",
      dueDate: task.createdAt.toISOString().slice(0, 10),
    },
  })

  async function onSubmit(values: CreateTaskInput) {

    const promise = updateTask(task.id, values)
    toast.promise(promise, {
      loading: "Updating task...",
      success: "Task updated",
      error: "Failed to update task",
    })

    await promise
    setOpen(false)

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent aria-describedby="UpdateTaskDialog">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input {...register("title")} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...register("description")} />
          </div>

          <div>
            <Label>Due Date</Label>
            <Input type="date" {...register("dueDate")} />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={isSubmitting}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}