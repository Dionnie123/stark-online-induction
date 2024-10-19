import { handleSignOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import React from "react";
import { mutate } from "swr";

export default function SignoutButton() {
  const signout = async () => {
    await handleSignOut();
    mutate(() => true, undefined, false);
  };

  return (
    <form action={signout}>
      <Button className="w-full" variant="default" type="submit">
        Sign Out
      </Button>
    </form>
  );
}
