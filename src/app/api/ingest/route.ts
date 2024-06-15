import { NextResponse } from "next/server";
import { checkAPIKeyValidity } from "../../../util/api/apiKey";
import { parse } from "node-html-parser";

export async function POST(request: Request) {
  // if the API key isn't valid, error
  const isValid = await checkAPIKeyValidity(request);
  if (!isValid) return new Response("nah dog", { status: 500 });

  // get the payload
  const { scoresUrl } = await request.json();
  console.log(scoresUrl);

  // TODO: time to scrape the data from the url
  // https://u8829925.ct.sendgrid.net/ls/click?upn=u001.dLU7tHB1zp3Y-2BTxfAGt7CK3G02CuBWFTeiEZ6ztkfyWBTQpryCZUhzE50XHZwWxFhkAAl2uL3GGbW7Q7CBFAzaOEyl-2BtYPChp30bb-2FT70Fn6t8w18T-2BczFB5-2FnQyHdNS7cckc7TZXgdLKHoyGU-2BzG3P36zd59ImIkKBSXgVB6i6RH86gMg65-2Fnk00f9RQt-2B2jZXfVyhPixwAzCcm3SEpnDhLXqtLGANMKZ9nAhdnZiE-3D3uPK_FLY6kdOOAu0SljMlVVMk04kcXQG-2Blzpw91aT-2Bo8DZ-2BVeF4fcADp1SWeoo64rub6pHIr5wBjjhd3H9WzJe5H2bYXmd-2FWJpztCFmJQOmmegOCa00n30UcuWsURrQ18O07YPBTZISoOp3O-2B6-2Ft33Xrpmi3HbwqBIOv8EukhSc5xZCGEoDh-2Ff71mCxXr-2FO9Vq-2FBFLfmkzdSOplCzIrmZ6jECkQ-3D-3D

  const res = await fetch(scoresUrl);

  const scoresText = await res.text();

  const root = parse(scoresText);
  // console.log(root);

  // TODO: create a list of my diff names to pick from: Zac, Zac Wellsandt, etc and filter by that
  const playerTds = root
    .querySelectorAll(".cls_player")
    .filter((td) => td.text.toLowerCase() === "zac");

  console.log(playerTds.length);

  // get the parent element (TR) of the found td's with my name
  const playerRows = playerTds.map((td) => td.parentNode);
  console.log(playerRows);

  // TODO: should be able to search for certain classes
  // within the frames to quickly get the ball1, ball2 and ball3

  return NextResponse.json({ nice: "work" });
}
