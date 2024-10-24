import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PasswordlessSigninForm from "@/app/auth/signin/components/credentials-form";

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
            <PasswordlessSigninForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
