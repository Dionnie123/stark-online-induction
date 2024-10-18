import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignInGithubForm from "@/app/auth/signin/components/github-form";
import CredentialsSigninForm from "@/app/auth/signin/components/credentials-form";

export default function SignInPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CredentialsSigninForm />
            <span className="text-sm text-gray-500 text-center block my-2">
              or
            </span>
            <SignInGithubForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
