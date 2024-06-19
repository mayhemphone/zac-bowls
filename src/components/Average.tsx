import React from "react";
//import styles from './Average.module.scss'
import { getAverageScores, getGames } from "@/db/queries";
type Props = {};

const Average = async ({}: Props) => {
  const avgScores = await getAverageScores();
  const games = await getGames();
  return (
    <>
      <h1>{avgScores} average</h1>
      <h3>from {games.length} games</h3>
    </>
  );
};

export default Average;
