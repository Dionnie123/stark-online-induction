"use client";

import {
  handleCredentialsSignin,
  handlePasswordlessSignin,
} from "@/actions/auth";
import ErrorMessage from "@/components/error-message";
import LoadingButton from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { passwordlessSchema } from "@/lib/zod/passwordless.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function PasswordlessSigninForm() {
  const params = useSearchParams();
  const error = params.get("error");
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string>("");

  useEffect(() => {
    if (error) {
      switch (error) {
        case "OAuthAccountNotLinked":
          setGlobalError("Please use your email and password to sign in.");
          break;
        default:
          setGlobalError("An unexpected error occurred. Please try again.");
      }
    }
    router.replace("/auth/signin");
  }, [error, router]);

  const form = useForm<z.infer<typeof passwordlessSchema>>({
    resolver: zodResolver(passwordlessSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordlessSchema>) => {
    try {
      const result = await handlePasswordlessSignin(values);
      if (result?.message) {
        setGlobalError(result.message);
      }
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return (
    <>
      {globalError && <ErrorMessage error={globalError} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton pending={form.formState.isSubmitting}>
            Sign in
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
