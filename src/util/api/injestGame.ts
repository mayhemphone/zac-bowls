import {
  createFrame,
  createGame,
  createThrow,
  createThrows,
} from "@/db/queries";

import { type GamesData } from "@/app/api/ingest/route";

export const insertCompleteGames = async (gamesData: GamesData) => {
  const gameIds = await gamesData?.scores.map(async (game) => {
    // i dont want to talk about it
    if (game == null) return;
    console.log("inserting", { game });

    const newGame = await createGame({
      date: gamesData.date,
      score: parseInt(game.score),
      number: 1,
      oil: gamesData.oil,
      location: gamesData.location,
      comments: "test data!",
    });

    await Object.entries(game.frames).forEach(async ([frame, value]) => {
      // // add frame
      console.log({ frame, value });

      const newFrame = await createFrame({
        frameNumber: parseInt(frame),
        gameId: newGame[0].id,
      });

      await Object.values(value).forEach(async (val, i) => {
        await createThrow({
          pins: val,
          throwNumber: i,
          frameId: newFrame[0].id,
        });
      });
    });

    console.log("✅ newGame[0].id", newGame[0].id);
    return newGame[0].id;
  });

  return gameIds;

  // // create game
  // const newGame = await createGame({
  //   date: "01/02/2022",
  //   score: 200,
  //   number: 1,
  //   oil: "house",
  //   location: "west seattle bowl",
  //   comments: "test data!",
  // });

  // // add frame
  // const newFrame = await createFrame({
  //   frameNumber: 1,
  //   gameId: newGame[0].id,
  // });

  // // add throws for that frame
  // const newThrows = await createThrows([
  //   {
  //     pins: "9",
  //     throwNumber: 1,
  //     ballId: 1,
  //     frameId: newFrame[0].id,
  //   },
  //   {
  //     pins: "/",
  //     throwNumber: 2,
  //     ballId: 1,
  //     frameId: newFrame[0].id,
  //   },
  // ]);
};
