'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function CreateTaskDialog() {
    return (
        // <Dialog>
        //     <DialogTrigger asChild>
        //         <Button variant="outline">Add Task</Button>
        //     </DialogTrigger>
        //     <DialogContent className="sm:max-w-md">
        //         <DialogHeader>
        //             <DialogTitle>Create Task</DialogTitle>
        //             <DialogDescription>
        //                 Fill in the details to create a new task.
        //             </DialogDescription>
        //         </DialogHeader>
        //         <div className="flex items-center gap-2">
        //             <div className="grid flex-1 gap-2">
        //                 <Label htmlFor="link" className="sr-only">
        //                     Link
        //                 </Label>
        //                 <Input
        //                     id="link"
        //                     placeholder='Task description'

        //                 />
        //             </div>

        //         </div>
        //         <Label>Priority Level:</Label>
        //          <RadioGroup defaultValue="option-one">
        //                 <div className="flex items-center gap-3">
        //                     <RadioGroupItem value="option-one" id="option-one" />
        //                     <Label htmlFor="option-one">Option One</Label>
        //                 </div>
        //                 <div className="flex items-center gap-3">
        //                     <RadioGroupItem value="option-two" id="option-two" />
        //                     <Label htmlFor="option-two">Option Two</Label>
        //                 </div>
        //                     <div className="flex items-center gap-3">
        //                     <RadioGroupItem value="option-three" id="option-three" />
        //                     <Label htmlFor="option-three">Option Three</Label>
        //                 </div>
        //             </RadioGroup>
        //         <DialogFooter className="sm:justify-start">

        //                 <Button type="button">Create</Button>

        //             <DialogClose asChild>
        //                 <Button type="button">Close</Button>
        //             </DialogClose>

        //         </DialogFooter>
        //     </DialogContent>
        // </Dialog>

        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Task</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create Task</DialogTitle>
                </DialogHeader>

                <form className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Task title..." />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Optional details..." />
                    </div>

                    <div>
                        <Label htmlFor="due">Due Date</Label>
                        <Input id="due" type="date" />
                    </div>

                    <RadioGroup defaultValue="option-one">
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="option-one" id="option-one" />
                            <Label htmlFor="option-one">Option One</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="option-two" id="option-two" />
                            <Label htmlFor="option-two">Option Two</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="option-three" id="option-three" />
                            <Label htmlFor="option-three">Option Three</Label>
                        </div>
                    </RadioGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>

                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
