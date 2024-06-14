import { verifyKey } from "@unkey/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const header = request.headers.get("Authorization");
  if (!header) {
    return new Response("No Auth header found", { status: 401 });
  }

  const token = header.replace("Bearer ", "");
  const { result, error } = await verifyKey(token);

  if (error) {
    return new Response("Something went wrong", { status: 500 });
  }
  if (!result.valid) {
    return new Response("Key not valid", { status: 401 });
  }
  return NextResponse.json({ result });
}
