import { z } from "zod";

import IBaseRepository from "./base.repository.interface";
import { Todo } from "@prisma/client";
import { todoSchema } from "@/lib/zod/todo.schema";
import prisma from "@/lib/db/prisma";

export default class TodoRepository extends IBaseRepository<
  Todo,
  z.infer<typeof todoSchema>
> {
  constructor() {
    super(prisma.todo);
  }
}
