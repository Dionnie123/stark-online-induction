"use server";
import TodoRepository from "@/application/repositories/todo.repository";

import { auth } from "@/auth";
import { z } from "zod";
import { Todo } from "@prisma/client";
import { todoSchema } from "@/lib/zod/todo.schema";

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
      todos = await todoRepository.getAll({
        where: {
          userId: session.user.id!,
        },
      });
    }

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
    const todo = await todoRepository.create({
      ...data,
      ...{
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
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
