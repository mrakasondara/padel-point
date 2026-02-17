import NextAuth from "next-auth/next";
import CredentialsProviders from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "@/database";
import { mongoURI } from "../../../../../constant";
import { Admin } from "@/database/models/admin";
import { User } from "@/database/models/user";

export const authOptions = {
  providers: [
    CredentialsProviders({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        await connectDB(mongoURI);

        const user = await User.findOne({ email: credentials.email });

        if (!user) return null;

        const isLoginValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isLoginValid) return null;

        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        const isAdmin = await Admin.findOne({ email: user.email });
        token.role = isAdmin ? "admin" : "user";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
