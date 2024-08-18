"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAverageScores } from "@/db/queries";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

type ScatterPlotProps = {
  avgScores: Awaited<ReturnType<typeof getAverageScores>>;
};

export default function ScatterPlot({ avgScores }: ScatterPlotProps) {
  return (
    <Card className="h-full w-full ">
      <CardHeader>
        <CardTitle>All time scores</CardTitle>
        <CardDescription>
          The tighter the veritical, the more consistent the gameplay.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DotChart className="aspect-[9/4]" avgScores={avgScores} />
      </CardContent>
    </Card>
  );
}

type DotChartProps = {
  avgScores: Awaited<ReturnType<typeof getAverageScores>>;
  className?: string;
};

function DotChart({ className, avgScores }: DotChartProps) {
  const data =
    avgScores?.games
      ?.sort((a, b) => a.date.localeCompare(b.date))
      ?.map((game) => {
        return {
          x: new Date(game.date).toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit",
          }),
          y: game.score,
        };
      }) || [];

  return (
    <div className={className}>
      <ResponsiveScatterPlot
        data={[{ id: "Scores", data: data }]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear" }}
        blendMode="normal"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
          tickRotation: -45,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["hsl(var(--primary))"]}
        useMesh={true}
        gridYValues={6}
        theme={{
          axis: {
            legend: {
              text: {
                fill: "hsl(var(--foreground))",
              },
            },
            ticks: {
              text: {
                fill: "hsl(var(--foreground))",
              },
            },
          },
          text: {
            color: "hsl(var(--charts-1))",
          },

          background: "transparent",
          tooltip: {
            chip: {
              borderRadius: "9999px",
              backgroundColor: "hsl(var(--background))",
              color: "hsl(var(--chart-1))",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
              backgroundColor: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
            },
          },
          grid: {
            line: {
              stroke: "hsl(var(--border))",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
