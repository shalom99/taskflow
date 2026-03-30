import { prisma } from "@/lib/prisma";

await prisma.user.create({
  data: {
    name: "Dev User",
    email: "dev@taskflow.local",
    password: "dev",
  },
})