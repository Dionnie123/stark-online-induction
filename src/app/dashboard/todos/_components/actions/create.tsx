"use client";

import { useState } from "react";
import TodoForm from "../form";

import { DialogTitle } from "@radix-ui/react-dialog";
import { mutate } from "swr";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CreateTodo() {
  const [isDialogOpen, setisDialogOpen] = useState(false);

  function handleOnSubmit() {
    setisDialogOpen(false);
    mutate("api/todos");
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setisDialogOpen}>
        <DialogTrigger asChild>
          <Button>Create</Button>
        </DialogTrigger>
        <DialogContent title="Create Todo" className="sm:max-w-[425px bg-white">
          <DialogTitle>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Create Todo
            </h3>
          </DialogTitle>
          <TodoForm onSubmit={handleOnSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
