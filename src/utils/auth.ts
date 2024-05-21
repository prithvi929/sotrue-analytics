import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (email !== "prithviraj@sotrue.com" || password !== "1234") {
          throw new Error("invalid credentials");
        }
        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "125458scty",
};
