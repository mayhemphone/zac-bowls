import { getGames, insertGameData } from "@/db/queries";
import { checkAPIKeyValidity } from "@/util/api/apiKey";
import { scrapeBowlingData } from "@/util/api/injestGame";
import { NextResponse } from "next/server";

async function scrapeAndInsterGame(linkId: number, url: string) {
  console.log("📉 scrapeAndInsterGame", { linkId, url });
  const bowlingData = await scrapeBowlingData(url);
  const games = await insertGameData(bowlingData, linkId);
  console.log("✅ Games returned:", games);
  return games;
}

export async function GET(request: Request) {
  // if the API key isn't valid, error
  const isValid = await checkAPIKeyValidity(request);
  if (!isValid) return new Response("nah dog", { status: 500 });

  // scrape all names used
  const games = await getGames();

  return NextResponse.json({ games });
}

// this endpoint really isn't needed.
// it's just for testing the ingestion process quickly
export async function POST(request: Request) {
  // if the API key isn't valid, error
  const isValid = await checkAPIKeyValidity(request);
  if (!isValid) return new Response("nah dog", { status: 500 });

  // get the payload
  const { url, linkId } = await request.json();

  // kick off game ingesttion without saving the gameId to the link row (we'll update later)
  const games = await scrapeAndInsterGame(parseInt(linkId, 10), url);

  return NextResponse.json({ games });
}
