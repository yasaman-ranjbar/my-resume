import { createAuthToken, getAuthCookieConfig } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const INVALID_CREDENTIALS_MSG = "Invalid email or password";

export async function POST(request: Request) {
  const body = await request.json();
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: INVALID_CREDENTIALS_MSG }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json({ error: INVALID_CREDENTIALS_MSG }, { status: 401 });
    }
    if (user.status !== "active") {
      return NextResponse.json({ error: "Account is not active" }, { status: 403 });
    }
    // Ensure stored hash is valid (bcrypt hashes are 60 chars)
    const storedHash = user.password.trim();
    if (storedHash.length < 59) {
      return NextResponse.json(
        { error: "Invalid password data. Please reset password in DB." },
        { status: 500 }
      );
    }
    const passwordMatch = await bcrypt.compare(password, storedHash);
    if (!passwordMatch) {
      return NextResponse.json({ error: INVALID_CREDENTIALS_MSG }, { status: 401 });
    }

    const token = await createAuthToken({
      sub: String(user.id),
      email: user.email,
    });
    const { name, value, options } = getAuthCookieConfig(token);
    const response = NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
    response.cookies.set(name, value, options);
    return response;
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
