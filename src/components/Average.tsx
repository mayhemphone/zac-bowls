//import styles from './Average.module.scss'
import { getAverageScores } from "@/db/queries";
import { subtractMonths } from "@/util/dates";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
type Props = {
  months?: number;
};

const Average = async ({ months }: Props) => {
  const avgScores = await getAverageScores({
    start: subtractMonths(months || 360),
    end: subtractMonths(0), // today
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>{months ? `${months} month ` : "All time "}</CardTitle>
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
