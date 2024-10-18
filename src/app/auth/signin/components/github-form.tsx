"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { handleGithubSignin } from "@/actions/auth";

export default function SignInGithubForm() {
  return (
    <>
      <form className="w-full" action={handleGithubSignin}>
        <Button variant="outline" className="w-full" type="submit">
          <GitHubLogoIcon className="h-4 w-4 mr-2" />
          Sign in with GitHub
        </Button>
      </form>
    </>
  );
}
