"use server";
import UserRepository from "@/application/repositories/user.repository";

import { auth } from "@/auth";
import { z } from "zod";
import { User } from "@prisma/client";
import { userSchema } from "@/entities/zod/user.schema";

const userRepository = new UserRepository();

export async function getAllUsersAction(): Promise<User[]> {
  try {
    const session = await auth();
    if (!session) {
      throw Error("Unauthenticated. Please login.");
    }
    let users: User[] = [];
    if (session.user.role == "admin") {
      users = await userRepository.getAll();
    } else if (session.user.role == "user") {
      users = await userRepository.getAll({
        where: {
          userId: session.user.id!,
        },
      });
    }

    return users;
  } catch (error) {
    throw error;
  }
}

export async function createUserAction(data: z.infer<typeof userSchema>) {
  try {
    const session = await auth();
    if (!session) {
      throw Error("Unauthenticated. Please login.");
    }
    const user = await userRepository.create(Object.assign(data));
    return user;
  } catch (error) {
    throw error;
  }
}

export async function updateUserAction(
  id: string,
  data: z.infer<typeof userSchema>
) {
  try {
    const session = await auth();
    if (!session) {
      throw Error("Unauthenticated. Please login.");
    }
    const user = await userRepository.update(id, Object.assign(data));
    return user;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserAction(id: string) {
  try {
    const session = await auth();
    if (!session) {
      throw Error("Unauthenticated. Please login.");
    }
    const user = await userRepository.delete(id);
    return user;
  } catch (error) {
    throw error;
  }
}
