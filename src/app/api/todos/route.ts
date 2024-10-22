import prisma from "../../../lib/db/prisma";

import TodoRepository from "@/application/repositories/todo.repository";
import { auth } from "@/auth";
import { todoSchema } from "@/lib/zod/todo.schema";
import { Todo } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const todoRepository = new TodoRepository();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fetchAllTodos = searchParams.get("all") === "true";
    const session = await auth();

    if (!session) {
      // If no session, return unauthorized error
      return NextResponse.json({ message: "Unauthorized" }, { status: 500 });
    }

    if (fetchAllTodos) {
      const todos = await todoRepository.getAll();
      return NextResponse.json(todos);
    }

    const todos = await todoRepository.getAllByUser(session.user.id!);
    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { message: "An unexpected error occured" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      // If no session, return unauthorized error
      return NextResponse.json({ message: "Unauthorized" }, { status: 500 });
    }

    const body = await req.json();
    const result = todoSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Invalid input",
        errors: result.error.errors,
      });
    }

    const todoData = result.data;

    const newTodo = await prisma.todo.create({
      data: {
        userId: token.id,
        title: todoData.title,
        description: todoData.description || "",
        isCompleted: todoData.isCompleted,
      },
    });

    return NextResponse.json(newTodo);
  } catch (error) {
    console.error("Error adding todo:", error);
    return NextResponse.json(
      { message: "An unexpected error occured" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Todo ID is required." },
        { status: 404 }
      );
    }

    const newTodo = await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { message: "An unexpected error occured" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;
    const result = todoSchema.safeParse(rest);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid Input", errors: result.error.errors },
        { status: 400 }
      );
    }

    const todoData = result.data as Todo;

    if (!id) {
      return NextResponse.json(
        { message: "Todo ID is required." },
        { status: 400 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        title: todoData.title,
        description: todoData.description,
        isCompleted: todoData.isCompleted,
      },
    });

    if (updatedTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Todo updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { message: "An unexpected error occured" },
      { status: 500 }
    );
  }
}
function getServerSession(req: any, res: any, authOptions: any) {
  throw new Error("Function not implemented.");
}
