import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import EmailProvider from "next-auth/providers/nodemailer";
import bcryptjs from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import { signInSchema } from "./lib/zod/signin.schema";
import prisma from "./lib/db/prisma";

const publicRoutes = ["/", "/auth/signin", "/auth/signup"];
const authRoutes = ["/auth/signin", "/auth/signup"];

export default {
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.EMAIL_FROM,
    }),

    /*    EmailProvider({
      id: "email",
      name: "email",
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.EMAIL_FROM,
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_POST,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
    }),
 */
    Github({ allowDangerousEmailAccountLinking: true }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        let user = null;

        // validate credentials
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }
        // get user

        user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          console.log("Invalid credentials");
          return null;
        }

        if (!user.password) {
          console.log(
            "User has no password. They probably signed up with an oauth provider."
          );
          return null;
        }

        const isPasswordValid = await bcryptjs.compare(
          credentials.password as string,
          user.password
        );
        if (!isPasswordValid) {
          console.log("Invalid password");
          return null;
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],

  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Allow access to public routes for all users
      if (publicRoutes.includes(pathname)) {
        return true;
      }

      // Redirect logged-in users away from auth routes
      if (authRoutes.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard/", nextUrl));
        }
        return true; // Allow access to auth pages if not logged in
      }

      // Allow access if the user is authenticated
      return isLoggedIn;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.name = user.name as string;
        token.role = user.role as string;
      }
      if (trigger === "update" && session.name) {
        token.name = session.name;
      }

      console.log("NEW JWT:" + JSON.stringify(token));
      return token;
    },
    session({ session, token }) {
      console.log("NEW SESSION:" + JSON.stringify(session.user));
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          role: token.role,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
} satisfies NextAuthConfig;
