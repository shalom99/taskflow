import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";
import { ModeToggle } from "@/components/mode-toggle";
import { getData } from "./mock-data";
import prisma from "@/lib/prisma";




export default async function DashboardPage() {
  const data = await getData();
  const users = await prisma.user.count();
  console.log(users)
  return (
    <div className="p-5 min-h-screen flex flex-col gap-y-5">
      <header className="flex justify-between">
        <div>
          <h1 className="text-5xl"> Welcome back! Users: {users}</h1>
          <h2>Here's a list of your tasks for this month.</h2>
        </div>
        <div className="flex gap-x-2">
          <Button>Profile Logo</Button>
          <ModeToggle />
        </div>
      </header>

      <div className="flex justify-between">
        <div className="flex">
          <Input type="email" placeholder="Filter tasks..." />
          <Button variant="outline">Status</Button>
          <Button variant="outline">Priority</Button>
        </div>

        <div className="flex gap-x-2">
          <Button variant="outline">View</Button>
          <Button variant="default">Add Task</Button>
        </div>
      </div>

      <div>
        Main content
        <DataTable columns={columns} data={data} />
      </div>

      <footer className="flex justify-between">
        <div>
          <p>Rows Selected</p>
        </div>
        <div className="flex">
          <p>Rows per Page</p>
          <p>Page #</p>
          <p>Control Buttons</p>
        </div>
      </footer>
    </div>
  );
}
