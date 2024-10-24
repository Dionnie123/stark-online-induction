"use server";
import UserRepository from "@/application/repositories/user.repository";

import { auth } from "@/auth";
import { z } from "zod";
import { User } from "@prisma/client";
import { UserSchema } from "@/lib/zod/user.schema";
import bcryptjs from "bcryptjs";
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

export async function getUserAction(
  id: string
): Promise<User | null | undefined> {
  try {
    const session = await auth();
    if (!session) {
      throw Error("Unauthenticated. Please login.");
    }
    const user = await userRepository.getOne(id);
    return user;
  } catch (error) {
    throw error;
  }
}

export async function createUserAction(data: z.infer<typeof UserSchema>) {
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
  data: z.infer<typeof UserSchema>
) {
  try {
    const session = await auth();
    if (!session) {
      throw Error("Unauthenticated. Please login.");
    }

    let hashedPassword: string | undefined;
    if (data.confirmPassword != null) {
      hashedPassword = await bcryptjs.hash(data.confirmPassword, 10);
    }

    const user = await userRepository.update(id, {
      email: data.email,
      name: data.name,
      password: hashedPassword,
    });

    console.log("UPDATED USER" + JSON.stringify(user));

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
