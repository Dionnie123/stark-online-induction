"use server";
import TodoRepository from "@/application/repositories/todo.repository";
import { todoSchema } from "@/entities/zod/todo.schema";
import { auth } from "@/auth";
import { z } from "zod";
import { error } from "console";
import { Todo } from "@prisma/client";

const todoRepository = new TodoRepository();

type StatusMessage = {
  status: "success" | "error" | "warning";
  message: string;
};

export async function getAllTodosAction(): Promise<Todo[]> {
  try {
    const session = await auth();
    if (!session) {
      throw Error("Unauthenticated. Please login.");
    }
    let todos: Todo[] = [];
    if (session.user.role == "admin") {
      todos = await todoRepository.getAll();
    } else if (session.user.role == "user") {
      todos = await todoRepository.getAllByUser(session.user.id!);
    }

    return todos;
  } catch (error) {
    throw Error(error?.toString());
  }
}

export async function getAllByUser(): Promise<Todo[]> {
  try {
    const session = await auth();
    if (!session) {
      throw Error("Unauthenticated. Please login.");
    }
    const todos = await todoRepository.getAllByUser(session.user.id!);
    return todos;
  } catch (error) {
    throw Error("Failed to fetch todo for user.");
  }
}

export async function createTodoAction(data: z.infer<typeof todoSchema>) {
  try {
    const session = await auth();
    if (!session) {
      throw Error("Unauthenticated. Please login.");
    }
    const todo = await todoRepository.create(
      Object.assign(data, { userId: session.user.id })
    );
    return todo;
  } catch (error) {
    return { message: "Failed to Create Todo." };
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
    return { message: "Failed to Update Todo." };
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
