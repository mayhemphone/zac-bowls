import { NextResponse } from "next/server";
import { checkAPIKeyValidity } from "../../../util/api/apiKey";
import { HTMLElement, parse } from "node-html-parser";
import { insertCompleteGames } from "@/util/api/injestGame";

export type GamesDataPromise = ReturnType<typeof scrapeBowlingData>;
export type GamesData = Awaited<GamesDataPromise>;

type KeyedObject = {
  [key: string]: (string | undefined)[];
};

// add to this
const NAMES = ["zac", "zac wellsandt", "z", "mayhem"];

const compileGameData = (game: HTMLElement) => {
  const framesData: KeyedObject = {};

  const frames = game.parentNode?.querySelectorAll(
    ".cls_frame"
  ) as HTMLElement[]; // Adjust the selector

  // frames 1-9
  frames.forEach((frame, index) => {
    const frameNumber = index + 1;
    const ball1 = frame.querySelector(".cls_ball1")?.text; // Adjust the selector
    const ball2 = frame.querySelector(".cls_ball2")?.text; // Adjust the selector

    const balls = [];

    if (ball1 && ball1 !== "" && ball1 !== " ") balls.push(ball1);
    if (ball2 && ball2 !== "" && ball2 !== " ") balls.push(ball2);

    if (balls.length > 0) framesData[`${frameNumber}`] = balls;
  });

  // frame 10
  const tenthFrame = game.parentNode.querySelector(".cls_frame10");
  const tenthBall1 = tenthFrame?.querySelector(".cls_ball1")?.text;
  const tenthBall2 = tenthFrame?.querySelector(".cls_ball2")?.text;
  const tenthBall3 = tenthFrame?.querySelector(".cls_ball3")?.text;

  framesData["10"] = [tenthBall1, tenthBall2, tenthBall3];

  // score
  const score = game.parentNode.querySelector(".cls_scoretotal")?.text!;

  if (Object.keys(framesData).length === 10)
    return { score, frames: framesData };

  return null;
};

async function scrapeBowlingData(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const root = parse(html);

  // get common items like date and location
  const date = root.querySelectorAll(".scoredate")[1]?.text;
  const location = root.querySelector(".scorecenter")?.text.toLocaleLowerCase();

  const games = root
    .querySelectorAll(".cls_player")
    .filter((td) => NAMES.includes(td.text.toLowerCase()));

  // compile the game data and filter out any undefined results (incomplete games)
  const scores = games
    .map(compileGameData)
    .filter((element) => element != null);

  // if there are no scores, this is a waste of time
  if (scores.length > 0) return { date, location, oil: "house", scores };
}

export async function POST(request: Request) {
  // if the API key isn't valid, error
  const isValid = await checkAPIKeyValidity(request);
  if (!isValid) return new Response("nah dog", { status: 500 });

  // get the payload
  const { scoresUrl } = await request.json();
  // console.log(scoresUrl);

  // get the game data
  scrapeBowlingData(scoresUrl).then((data) => {
    console.log({ data });
    // now put these into the db!
    insertCompleteGames(data);
  });

  return NextResponse.json({ nice: "work" });
}
