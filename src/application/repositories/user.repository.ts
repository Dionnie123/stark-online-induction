import prisma from "../../lib/db/prisma";
import IBaseRepository from "./base.repository.interface";
import { User } from "@prisma/client";
import { z } from "zod";
import { UserSchema } from "@/lib/zod/user.schema";

export default class UserRepository extends IBaseRepository<
  User,
  z.infer<typeof UserSchema>
> {
  constructor() {
    super(prisma.user);
  }
}
