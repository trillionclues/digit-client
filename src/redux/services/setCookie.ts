import { serialize } from "cookie";
import { NextApiResponse } from "next";

export function setCookie(res: NextApiResponse, name: string, value: string) {
  const cookie = serialize(name, value, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  res.setHeader("Set-Cookie", [cookie]);
}
