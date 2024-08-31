import { insertGameData } from "@/db/queries";
import { HTMLElement, parse } from "node-html-parser";

export type GamesDataPromise = ReturnType<typeof scrapeBowlingData>;
export type GamesData = Awaited<GamesDataPromise>;

export type KeyedObject = {
  [key: string]: {
    throws?: (string | undefined)[];
    score?: string | undefined;
  };
};

// if i want scores from all games
// const NAMES = ["zac", "zac wellsandt", "z", "mayhem"];

// ingest only league games
export const NAMES = ["zac wellsandt"];

export const compileGameData = (game: HTMLElement) => {
  const framesData: KeyedObject = {};

  const frames = game.parentNode?.querySelectorAll(
    ".cls_frame"
  ) as HTMLElement[]; // Adjust the selector

  // frames 1-9
  frames.forEach((frame, index) => {
    const frameNumber = index + 1;
    const ball1 = frame.querySelector(".cls_ball1")?.text; // Adjust the selector
    const ball2 = frame.querySelector(".cls_ball2")?.text; // Adjust the selector
    const score = frame.querySelector(".cls_framescore")?.text;
    console.log("☠️", { score });
    const balls = [];

    if (ball1 && ball1 !== "" && ball1 !== " ") balls.push(ball1);
    if (ball2 && ball2 !== "" && ball2 !== " ") balls.push(ball2);

    // attach running score to frame
    // attach throws to frame
    framesData[`${frameNumber}`] = { throws: [], score: undefined };
    if (balls.length > 0) {
      console.log("🎳", { framesData: framesData[frameNumber], balls });
      framesData[`${frameNumber}`].throws = balls;
      if (score) framesData[`${frameNumber}`].score = score;
    }
  });

  // frame 10
  const tenthFrame = game.parentNode.querySelector(".cls_frame10");
  const tenthBall1 = tenthFrame?.querySelector(".cls_ball1")?.text;
  const tenthBall2 = tenthFrame?.querySelector(".cls_ball2")?.text;
  const tenthBall3 = tenthFrame?.querySelector(".cls_ball3")?.text;
  // score
  const score = game.parentNode.querySelector(".cls_scoretotal")?.text!;

  framesData["10"] = { throws: [], score };
  framesData["10"].throws = [tenthBall1, tenthBall2, tenthBall3];

  if (Object.keys(framesData).length === 10) {
    return { score, frames: framesData };
  } else {
    console.log("🚨 Incomplete game", { framesData });
  }

  return null;
};

export async function scrapeBowlingData(url: string) {
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

  console.log("🎳 Games scrape", { date, scores });
  // if there are no scores, this is a waste of time
  if (scores.length > 0) return { date, location, oil: "house", scores };
}

export async function scrapeAndInsertGame(linkId: number, url: string) {
  const bowlingData = await scrapeBowlingData(url);
  insertGameData(bowlingData, linkId);
}
