"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingButton from "@/components/loading-button";
import { useState } from "react";

import { mutate } from "swr";
import { Todo } from "@prisma/client";
import ErrorMessage from "@/components/error-message";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { todoSchema } from "@/entities/zod/todo.schema";
import { createTodoAction, updateTodoAction } from "@/actions/todo";
import { useSession } from "next-auth/react";

type TodoFormProps = {
  todo?: Todo;
  onSubmit: () => void;
};

type FormValues = z.infer<typeof todoSchema>;

export default function TodoForm({ todo, onSubmit }: TodoFormProps) {
  const [globalError, setGlobalError] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: todo
      ? {
          title: todo.title,
          description: todo.description,
          isCompleted: todo.isCompleted,
        }
      : undefined,
  });

  const _onSubmit = async (values: FormValues) => {
    try {
      if (todo === undefined) {
        await createTodoAction(values);
      } else {
        await updateTodoAction(todo.id, values);
      }
      mutate("/api/todos");
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
      setGlobalError(`${error}`);
    }
    form.reset();
    onSubmit();
    /*      try {
      if (todo === undefined) {
        await fetch("/api/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
      } else {
        await fetch("/api/todos", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, id: todo!.id }),
        });
      }
      mutate("/api/todos");
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
      setGlobalError(`${error}`);
    } 
     form.reset();
    onSubmit();  */
  };

  return (
    <>
      {globalError && <ErrorMessage error={globalError} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    required
                    placeholder="Enter Title"
                    autoComplete="off"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    autoComplete="off"
                    placeholder="Enter Description."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isCompleted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="space-y-1 leading-none">
                  Description
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton pending={form.formState.isSubmitting}>
            {todo ? "Update" : "Create"}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
