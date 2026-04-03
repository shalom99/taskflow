"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
import { createTask } from "@/actions/task"
import { toast } from "sonner"

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false)
  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
  })

  async function onSubmit(values: CreateTaskInput) {
    

    const promise = createTask(values)
    toast.promise(promise, {
      loading: "Creating task...",
      success: "Task created",
      error: "Failed to create task",
    })

    await promise
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>

      <DialogContent aria-describedby="Create Task">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input {...register("title")} disabled={isSubmitting}/>
            {errors.title && (
              <p className="text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea {...register("description")} />
          </div>

          {/* Due date */}
          <div>
            <Label>Due Date</Label>
            <Input type="date" {...register("dueDate")} />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}