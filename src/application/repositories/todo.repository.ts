import { z } from "zod";
import prisma from "../../../prisma/prisma";
import IBaseRepository from "./base.repository.interface";
import { Todo } from "@prisma/client";
import { todoSchema } from "@/entities/zod/todo.schema";

const DEFAULT_ORDER_BY = {
  createdAt: "desc",
};
const MAX_RECORDS_LIMIT = 100;

export default class TodoRepository extends IBaseRepository<
  Todo,
  z.infer<typeof todoSchema>
> {
  constructor() {
    super(prisma.todo);
  }

  getAllByUser(
    user_id: string,
    options: Record<string, any> = {}
  ): Promise<Todo[]> {
    if (!options.orderBy) {
      options.orderBy = DEFAULT_ORDER_BY;
    }
    if (!options.take || options.take > MAX_RECORDS_LIMIT) {
      options.take = MAX_RECORDS_LIMIT;
    }

    options.where = { user_id };
    return this.modelClient.findMany(options);
  }
}
