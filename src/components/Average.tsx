import React from "react";
//import styles from './Average.module.scss'
import { getAverageScores } from "@/db/queries";
type Props = {};

const Average = async ({}: Props) => {
  const avgScores = getAverageScores();
  return <h1>{avgScores}</h1>;
};

export default Average;
