import { createBall, getGames } from "@/db/queries";
import { checkAPIKeyValidity } from "@/util/api/apiKey";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // if the API key isn't valid, error
  const isValid = await checkAPIKeyValidity(request);
  if (!isValid) return new Response("nah dog", { status: 500 });

  // get the payload
  const newBallData = await request.json();

  // scrape all names used
  const newBall = await createBall(newBallData);
  console.log({ newBall });
  return NextResponse.json({ newBall });
}
