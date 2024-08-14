"use client";

import React, { useEffect, useState } from "react";
//import styles from './Average.module.scss'
import { getAverageScores, getGames } from "@/db/queries";
import { subtractMonths } from "@/util/dates";
import Link from "next/link";
import AverageButton from "../AverageButton/AverageButton";
type Props = {};

const Average = ({}: Props) => {
  const [months, setMonths] = useState(360);
  const [avgScores, setavgScores] = useState<any>(undefined);

  useEffect(() => {
    const getScores = async () => {
      const avgScores = await getAverageScores({
        start: subtractMonths(months),
        end: subtractMonths(0), // today
      });
      setavgScores(avgScores);
    };
    getScores();
  }, [months]);

  return (
    <>
      {/* <pre
        style={{
          maxHeight: "500px",
          overflow: "auto",
          width: "80vw",
          outline: "1px solid grey",
          margin: "1rem 0",
          padding: "1rem",
        }}
      >
        {JSON.stringify(avgScores, null, 2)}
      </pre> */}
      <div
        style={{
          // outline: "1px solid red",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{avgScores?.average} average</h1>
        <h3>from {avgScores?.count} games</h3>
        <div style={{ display: "flex", gap: ".5rem", margin: ".5rem 0" }}>
          <AverageButton setMonths={setMonths} months={months} value={360}>
            All Time
          </AverageButton>
          <AverageButton setMonths={setMonths} months={months} value={3}>
            3 Months
          </AverageButton>
          <AverageButton setMonths={setMonths} months={months} value={2}>
            2 Month
          </AverageButton>
          <AverageButton setMonths={setMonths} months={months} value={1}>
            1 Month
          </AverageButton>
        </div>
      </div>
    </>
  );
};

export default Average;
