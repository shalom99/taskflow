"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreatePage() {
  const acceptedValues = ["low", "medium", "high"] as const;

  const formSchema = z.object({
    title: z
      .string()
      .min(5, "Task title must be at leat 5 characters")
      .max(32, "Task title must be at most 32 characters."),
    level: z.enum(acceptedValues),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      level: "low",
    },
  });

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
    });
  }

  return (
    // <div>
    //   <form onSubmit={form.handleSubmit(onSubmit)}>
    //     <FieldSet>
    //       <FieldLegend>Create a new task</FieldLegend>

    //       <FieldGroup>
    //         <Field>
    //           <FieldLabel htmlFor="name">Task Title</FieldLabel>
    //           <Input
    //             id="task-title"
    //             autoComplete="off"
    //             placeholder="Task Description"
    //           />
    //           {/* <FieldDescription>This appears on invoices and emails.</FieldDescription> */}
    //         </Field>

    //         <FieldDescription>Priority Level:</FieldDescription>
    // <RadioGroup defaultValue="low">
    //   <Field orientation="horizontal">
    //     <RadioGroupItem value="low" id="priority-low" />
    //     <FieldLabel htmlFor="priority-low" className="font-normal">
    //       Low
    //     </FieldLabel>
    //   </Field>
    //   <Field orientation="horizontal">
    //     <RadioGroupItem value="medium" id="priority-medium" />
    //     <FieldLabel htmlFor="priority-medium" className="font-normal">
    //       Medium
    //     </FieldLabel>
    //   </Field>
    //   <Field orientation="horizontal">
    //     <RadioGroupItem value="high" id="priority-high" />
    //     <FieldLabel htmlFor="priority-high" className="font-normal">
    //       High
    //     </FieldLabel>
    //   </Field>
    // </RadioGroup>
    //       </FieldGroup>
    //     </FieldSet>
    //   </form>
    //   <Field orientation="horizontal">
    //     <Button type="submit">Submit</Button>
    //     <Button variant="outline" type="button">
    //       Cancel
    //     </Button>
    //   </Field>
    // </div>

    <div>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Bug Report</CardTitle>
          <CardDescription>
            Help us improve by reporting bugs you encounter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Bug Title
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Login button not working on mobile"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="level"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-description">
                      Priority Level
                    </FieldLabel>
                    {/* <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup> */}
                    <RadioGroup defaultValue="low">
                      <Field orientation="horizontal">
                        <RadioGroupItem value="low" id="priority-low" />
                        <FieldLabel
                          htmlFor="priority-low"
                          className="font-normal"
                        >
                          Low
                        </FieldLabel>
                      </Field>
                      <Field orientation="horizontal">
                        <RadioGroupItem value="medium" id="priority-medium" />
                        <FieldLabel
                          htmlFor="priority-medium"
                          className="font-normal"
                        >
                          Medium
                        </FieldLabel>
                      </Field>
                      <Field orientation="horizontal">
                        <RadioGroupItem value="high" id="priority-high" />
                        <FieldLabel
                          htmlFor="priority-high"
                          className="font-normal"
                        >
                          High
                        </FieldLabel>
                      </Field>
                    </RadioGroup>

                    <FieldDescription>
                      Include steps to reproduce, expected behavior, and what
                      actually happened.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo">
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
