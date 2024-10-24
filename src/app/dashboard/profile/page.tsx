"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import UserForm from "./form";
import { useSession } from "next-auth/react";

function titleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
}

export default function ProfilePage() {
  const { update, data } = useSession();

  return (
    <div>
      <p>{JSON.stringify(data?.user ?? "")} </p>

      <UserForm />
    </div>
  );
}
