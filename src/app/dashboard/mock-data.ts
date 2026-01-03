import { Payment } from "./columns";

export async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      checkbox: "checkbox",
      id: "728ed52f",
      task: "Task 1",
      title: "Design new homepage",
      status: "In Progress",
      priority: "High",
    },
    // ...
  ];
}