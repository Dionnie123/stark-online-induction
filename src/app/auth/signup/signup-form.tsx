"use client";

import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loading-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import ErrorMessage from "../../../components/error-message";
import { signUpSchema } from "@/lib/zod/signup.schema";
import { handleCredentialsSignin, handleSignUp } from "@/actions/auth";

export default function SignUpForm() {
  const [globalError, setGlobalError] = useState("");

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const result: ServerActionResponse = await handleSignUp(values);
      if (result.success) {
        console.log("Account created successfully.");
        const valuesForSignin = {
          email: values.email,
          password: values.password,
        };
        await handleCredentialsSignin(valuesForSignin);
      } else {
        setGlobalError(result.message);
      }
    } catch (error) {
      setGlobalError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      {globalError && <ErrorMessage error={globalError} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {["name", "email", "password", "confirmPassword"].map((field) => (
            <FormField
              control={form.control}
              key={field}
              name={field as keyof z.infer<typeof signUpSchema>}
              render={({ field: fieldProps }) => (
                <FormItem>
                  <FormLabel>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={
                        field.includes("password")
                          ? "password"
                          : field === "email"
                          ? "email"
                          : "text"
                      }
                      placeholder={`Enter your ${field}`}
                      {...fieldProps}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <LoadingButton pending={form.formState.isSubmitting}>
            Sign up
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
