import { handleSignOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import React from "react";

export default function SignoutButton() {
  return (
    <form action={handleSignOut}>
      <Button className="w-full" variant="default" type="submit">
        Sign Out
      </Button>
    </form>
  );
}
