import { connectDB } from "@/database";
import { Admin } from "@/database/models/admin";
import { User } from "@/database/models/user";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProviders from "next-auth/providers/credentials";

import { mongoURI } from "../../../../../constant";
import { getUserImageProfile } from "@/supabase/storage/client";

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
        const userData = await User.findOne({ email: user.email });
        token.email = user.email;
        token.fullName = userData.full_name ?? "";

        if (userData.image_thumb) {
          const { data, error } = await getUserImageProfile(
            userData.image_thumb
          );
          token.imageThumb = data?.publicUrl ?? null;
        } else {
          token.imageThumb = null;
        }
      }

      if (!token.role && token.email) {
        const isAdmin = await Admin.findOne({ email: token.email });
        token.role = isAdmin ? isAdmin.role : "user";
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.fullName = token.fullName;
        session.user.imageThumb = token.imageThumb;
      }
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
