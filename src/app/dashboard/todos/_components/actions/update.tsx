"use client";

import { useState } from "react";
import TodoForm from "../form";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Todo } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

type UpdateTodoProps = {
  defaultValues: Todo;
};

export default function UpdateTodo({ defaultValues }: UpdateTodoProps) {
  const [isDialogOpen, setisDialogOpen] = useState(false);

  function handleOnSubmit() {
    setisDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} modal={true} onOpenChange={setisDialogOpen}>
      <DialogTrigger asChild>
        <p className="w-full p-2 py-1">Update</p>
      </DialogTrigger>
      <DialogContent
        onKeyDown={(e) => e.stopPropagation()}
        title="Update Todo"
        className="sm:max-w-[425px bg-white"
      >
        <DialogTitle>Update Todo</DialogTitle>
        <DialogHeader></DialogHeader>
        <TodoForm onSubmit={handleOnSubmit} todo={defaultValues} />
      </DialogContent>
    </Dialog>
  );
}
