import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { checkIsAdmin } from "@/database";
import { mongoURI } from "../../constant";

export const authCheckIsAdmin = async (req) => {
  const isAuth = await authCheck(req);

  if (!isAuth.email) return isAuth;

  const { email } = isAuth;
  const isAdmin = await checkIsAdmin({ url: mongoURI, email });

  if (!isAdmin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized Access" },
      { status: 401 }
    );
  }

  return null;
};

export const authCheck = async (req) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized Access" },
      { status: 401 }
    );
  }
  return token;
};

export const encryptPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 11);
  return hashedPassword;
};
