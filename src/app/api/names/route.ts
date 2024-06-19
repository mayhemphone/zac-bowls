import { checkAPIKeyValidity } from "@/util/api/apiKey";
import { NextResponse } from "next/server";
import { HTMLElement, parse } from "node-html-parser";

async function scrapeNames(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const root = parse(html);

  // get common items like date and location
  const date = root.querySelectorAll(".scoredate")[1]?.text;
  const location = root.querySelector(".scorecenter")?.text.toLocaleLowerCase();

  const games = root.querySelectorAll(".cls_player");

  // compile the game data and filter out any undefined results (incomplete games)

  const names = games.reduce((acc, itm) => {
    acc.push(itm.text);
    return acc;
  }, [] as string[]);

  console.log(names);
  return names;
}

export async function POST(request: Request) {
  // if the API key isn't valid, error
  const isValid = await checkAPIKeyValidity(request);
  if (!isValid) return new Response("nah dog", { status: 500 });

  // get the payload
  const { scoresUrl } = await request.json();

  // scrape all names used
  const names = await scrapeNames(scoresUrl);

  return NextResponse.json({ names });
}
