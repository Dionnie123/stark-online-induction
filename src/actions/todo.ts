"use server";
import TodoRepository from "@/application/repositories/todo.repository";
import { todoSchema } from "@/entities/zod/todo.schema";
import { auth } from "@/auth";
import { z } from "zod";
import { Todo } from "@prisma/client";

const todoRepository = new TodoRepository();

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
    throw error;
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
    throw error;
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
    throw Error("Mamaloan");
    return todo;
  } catch (error) {
    throw error;
  }
}

export async function updateTodoAction(
  id: string,
  data: z.infer<typeof todoSchema>
) {
  try {
    const session = await auth();
    if (!session) {
      throw Error("Unauthenticated. Please login.");
    }
    const todo = await todoRepository.update(id, Object.assign(data));
    return todo;
  } catch (error) {
    throw error;
  }
}

export async function deleteTodoAction(id: string) {
  try {
    const session = await auth();
    if (!session) {
      throw Error("Unauthenticated. Please login.");
    }
    const todo = await todoRepository.delete(id);
    return todo;
  } catch (error) {
    throw error;
  }
}
