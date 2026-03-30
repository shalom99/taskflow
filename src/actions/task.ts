// app/actions/tasks.ts
"use server"

import { prisma } from "@/lib/prisma"
import { createTaskSchema } from "@/lib/validators/task"
import { revalidatePath } from "next/cache"


export async function createTask(data: unknown) {
  const parsed = createTaskSchema.parse(data)


  await prisma.task.create({
    data: {
      title: parsed.title,
      description: parsed.description,
      dueDate: parsed.dueDate ? new Date(parsed.dueDate) : null,
      userId: 1 // replace with session user later
    }
  })

  revalidatePath("/tasks")
}

export async function getTasks(userId: number) {
  return prisma.task.findMany({
    where: {
      userId,
      deletedAt: null
    },
    orderBy: {
      createdAt: "desc", 
    }
  })

}

export async function updateTask(id: number, data: unknown) {
  const parsed = createTaskSchema.parse(data)

  await prisma.task.update({
    where: { id },
    data: {
      title: parsed.title,
      description: parsed.description,
      dueDate: parsed.dueDate ? new Date(parsed.dueDate) : null,
    }
  })

  revalidatePath("/tasks")
}

export async function deleteTask(id: number) {
  await prisma.task.delete({
    where: { id },
  })

  revalidatePath("/tasks")
}

