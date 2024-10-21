import { z } from "zod";
import prisma from "../../../prisma/prisma";
import IBaseRepository from "./base.repository.interface";
import { Todo } from "@prisma/client";
import { todoSchema } from "@/entities/zod/todo.schema";

export default class TodoRepository extends IBaseRepository<
  Todo,
  z.infer<typeof todoSchema>
> {
  constructor() {
    super(prisma.todo);
  }
}
