
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/app/lib/prisma";
import { User as NextAuthUser } from "next-auth";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // ------------------- signIn -------------------
    async signIn(params) {
      const user = params.user;
      console.log(user) // type: User | AdapterUser

      // Ensure non-nullable fields for DB
      const name = user.name ?? "";
      const email = user.email ?? "";
      const image = user.image ?? "";

      const existing = await prisma.user.findUnique({
        where: { email },
      });

      if (!existing) {
        await prisma.user.create({
          data: { name, email, image },
        });
      }

      return true;
    },

    // ------------------- jwt -------------------
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email ?? "" },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name ?? "";
          token.email = dbUser.email ?? "";
          token.image = dbUser.image ?? "";
        }
      }
      return token;
    },

    // ------------------- session -------------------
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name ?? "";
        session.user.email = token.email ?? "";
        session.user.image = token.image ?? "";
      }
      return session;
    },
  },
};
