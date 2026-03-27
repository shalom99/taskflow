"use server"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { DataTable } from "./data-table";
import { getData } from "./mock-data";
import { prisma } from "@/lib/prisma";
import { columns } from "./columns";
import CreateTaskDialog from "./create/create-task-dialog";

export default async function DashboardPage() {
//   const data = await getData();
//   const users = await prisma.user.count();
//   console.log(users)

    return (
        <div className="p-5 min-h-screen flex flex-col gap-y-5">
            <header className="flex justify-between">
                <div>
                    <h1 className="text-5xl"> Welcome back! User </h1>
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
                 
                    <CreateTaskDialog />
                </div>
            </div>

            <div>
                Main content
                {/* <DataTable columns={columns} data={data} /> */}
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