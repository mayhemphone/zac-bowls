import { createLink } from "@/db/queries/links";
import { scrapeAndInsertGame } from "@/util/api/ingestGame";
import { NextResponse } from "next/server";
import { checkAPIKeyValidity } from "../../../util/api/apiKey";

// new POST that creates record in LINKS table
export async function POST(request: Request) {
  // if the API key isn't valid, error
  const isValid = await checkAPIKeyValidity(request);
  if (!isValid) return new Response("nah dog", { status: 500 });

  // get the payload
  const { url, emailDate } = await request.json();
  // console.log({scoresUrl,emailDate});

  // create a link
  const createdLink = await createLink({ url, emailDate });

  // kick off game ingesttion without saving the gameId to the link row (we'll update later)
  if (createdLink[0]?.id) {
    // this is only working locally.
    await scrapeAndInsertGame(createdLink[0].id, url);
  }

  return NextResponse.json({ message: "cool thx", createdLink });
}
