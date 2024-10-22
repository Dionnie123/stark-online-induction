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
            <div>
              <TextInput control={form.control} name="name" />
            </div>
            <div>
              <TextInput disabled control={form.control} name="email" />
            </div>
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
