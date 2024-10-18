import { todoSchema } from "@/entities/zod/todo.schema";
import prisma from "../../../prisma/prisma";
import IBaseRepository from "./base.repository.interface";
import { User } from "@prisma/client";
import { z } from "zod";

export default class UserRepository extends IBaseRepository<
  User,
  z.infer<typeof todoSchema>
> {
  constructor() {
    super(prisma.user);
  }
}
