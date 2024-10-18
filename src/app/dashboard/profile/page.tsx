import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";

function titleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
}

export default async function ProfilePage() {
  const session = await auth();

  console.log({ session });
  return (
    <div>
      {/*  <button
        onClick={() => {
          session?.user && update({ ...session.user, name: "Mamaloan" });
        }}
      >
        Update session
      </button> */}

      <p>{JSON.stringify(session?.user ?? "")} </p>
      <div className=" space-y-6">
        <header className="space-y-1.5">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Avatar"
              width="96"
              height="96"
              className="border rounded-full"
              style={{ aspectRatio: "96/96", objectFit: "cover" }}
            />
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold">{session?.user.name ?? ""}</h1>
              <p className="text-gray-500 dark:text-gray-400">
                {titleCase(session?.user.role ?? "")}
              </p>
            </div>
          </div>
        </header>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  defaultValue={session?.user.name ?? ""}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type={session?.user.email ?? ""}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter your phone" type="tel" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Change Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  placeholder="Enter your current password"
                  type="password"
                />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  placeholder="Enter your new password"
                  type="password"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  placeholder="Confirm your new password"
                  type="password"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Button size="lg">Save</Button>
        </div>
      </div>
    </div>
  );
}
