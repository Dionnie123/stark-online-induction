"use client";

import { Form } from "@/components/ui/form";

import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingButton from "@/components/loading-button";
import { useState } from "react";

import { mutate } from "swr";

import ErrorMessage from "@/components/error-message";

import { createUserAction, updateUserAction } from "@/actions/user";

import { TextInput } from "@/lib/form-helpers";
import { UserSchema } from "@/lib/zod/user.schema";
import { User } from "@prisma/client";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

type FormValues = z.infer<typeof UserSchema>;

export default function UserForm() {
  const { update, data } = useSession();
  const [globalError, setGlobalError] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: data?.user.name,
      email: data?.user.email!,
    },
  });

  const _onSubmit = async (values: FormValues) => {
    try {
      await updateUserAction(data?.user.id!, values);
      update({ ...data?.user, ...values });
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
      setGlobalError(`${error}`);
    }
  };

  return (
    <>
      {globalError && <ErrorMessage error={globalError} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <header className="space-y-1.5">
              <div className="flex items-center space-x-4 col-span-2">
                <img
                  src="https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Avatar"
                  width="96"
                  height="96"
                  className="border rounded-full"
                  style={{ aspectRatio: "96/96", objectFit: "cover" }}
                />
                <div className="space-y-1.5">
                  <h1 className="text-2xl font-bold">
                    {data?.user.name ?? ""}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    {data?.user.role ?? ""}
                  </p>
                </div>
              </div>
            </header>

            <h2 className="text-lg font-semibold col-span-2">
              Personal Information
            </h2>
            <div>
              <TextInput control={form.control} name="name" />
            </div>
            <div>
              <TextInput disabled control={form.control} name="email" />
            </div>

            <h2 className="text-lg font-semibold col-span-2">
              Change Password
            </h2>
            <div>
              <TextInput
                type="password"
                control={form.control}
                name="newPassword"
              />
            </div>
            <div>
              <TextInput
                type="password"
                control={form.control}
                name="confirmPassword"
              />
            </div>
          </div>

          <LoadingButton pending={form.formState.isSubmitting}>
            Update
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
