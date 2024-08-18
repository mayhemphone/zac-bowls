import React, { useEffect, useState } from "react";
//import styles from './Average.module.scss'
import { getAverageScores, getGames } from "@/db/queries";
import { subtractMonths } from "@/util/dates";
import Link from "next/link";
import AverageButton from "./AverageButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
type Props = {
  avgScores: Awaited<ReturnType<typeof getAverageScores>>;
  months?: number;
};

const Average = ({ avgScores, months }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {months ? `${months} month ` : "All time "}average
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="text-4xl font-bold">{avgScores?.average}</h1>
      </CardContent>
      <CardFooter className="gap-2">
        <p className="text-sm">from {avgScores?.count} games</p>
      </CardFooter>
    </Card>
  );
};

export default Average;
