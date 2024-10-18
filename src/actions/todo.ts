"use server";
import TodoRepository from "@/application/repositories/todo.repository";
import { todoSchema } from "@/entities/zod/todo.schema";

import { z } from "zod";

const todoRepository = new TodoRepository();

export async function createTodoAction(data: z.infer<typeof todoSchema>) {
  try {
    const todo = await todoRepository.create(Object.assign(data));
    return todo;
  } catch (error) {
    return { message: "Database Error: Failed to Create Todo." };
  }
}

export async function updateTodoAction(
  id: string,
  data: z.infer<typeof todoSchema>
) {
  try {
    const todo = await todoRepository.update(id, Object.assign(data));
    return todo;
  } catch (error) {
    return { message: "Database Error: Failed to Update Todo." };
  }
}

export async function deleteTodoAction(id: string) {
  try {
    const todo = await todoRepository.delete(id);
    return todo;
  } catch (error) {
    return { message: "Database Error: Failed to Delete Todo." };
  }
}
