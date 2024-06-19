import { getGames } from "@/db/queries";
import { checkAPIKeyValidity } from "@/util/api/apiKey";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // if the API key isn't valid, error
  const isValid = await checkAPIKeyValidity(request);
  if (!isValid) return new Response("nah dog", { status: 500 });

  // scrape all names used
  const games = await getGames();

  return NextResponse.json({ games });
}
