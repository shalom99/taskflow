import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod"
import { Controller, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

export default function CreatePage() {

  const acceptedValues = ['low','medium','high'] as const;

  const formSchema = z.object({
    title: z
        .string()
        .min(5, "Task title must be at leat 5 characters")
        .max(32, "Task title must be at most 32 characters."),
    level: z
        .enum(acceptedValues),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
        level: "low",
    }
  })

 function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldLegend>Create a new task</FieldLegend>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Task Title</FieldLabel>
              <Input
                id="task-title"
                autoComplete="off"
                placeholder="Task Description"
              />
              {/* <FieldDescription>This appears on invoices and emails.</FieldDescription> */}
            </Field>

            <FieldDescription>Priority Level:</FieldDescription>
            <RadioGroup defaultValue="low">
              <Field orientation="horizontal">
                <RadioGroupItem value="low" id="priority-low" />
                <FieldLabel htmlFor="priority-low" className="font-normal">
                  Low
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="medium" id="priority-medium" />
                <FieldLabel htmlFor="priority-medium" className="font-normal">
                  Medium
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="high" id="priority-high" />
                <FieldLabel htmlFor="priority-high" className="font-normal">
                  High
                </FieldLabel>
              </Field>
            </RadioGroup>
          </FieldGroup>
        </FieldSet>
      </form>
      <Field orientation="horizontal">
        <Button type="submit">Submit</Button>
        <Button variant="outline" type="button">
          Cancel
        </Button>
      </Field>
    </div>
  );
}
