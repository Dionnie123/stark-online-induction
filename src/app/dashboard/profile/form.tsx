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
import { userSchema } from "@/entities/zod/user.schema";
import { User } from "@prisma/client";

type UserFormProps = {
  user?: User;
  onSubmit?: () => void;
};

type FormValues = z.infer<typeof userSchema>;

export default function UserForm({ user, onSubmit }: UserFormProps) {
  const [globalError, setGlobalError] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
        }
      : undefined,
  });

  const _onSubmit = async (values: FormValues) => {
    try {
      if (user === undefined) {
        await createUserAction(values);
      } else {
        await updateUserAction(user.id, values);
      }
      mutate("/api/users");
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
      setGlobalError(`${error}`);
    }
    form.reset();
    onSubmit ? onSubmit() : null;
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
              <TextInput control={form.control} name="email" />
            </div>
          </div>

          <LoadingButton pending={form.formState.isSubmitting}>
            {user ? "Update" : "Create"}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
