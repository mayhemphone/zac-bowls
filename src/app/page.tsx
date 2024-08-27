import Average from "@/components/Average";
import ScatterPlot from "@/components/charts/ScatterPlot";
import ScoreBoard from "@/components/scoreBoard/ScoreBoard";
import { getAverageScores, getLatestCompleteGame } from "@/db/queries";
import { subtractMonths } from "@/util/dates";

export default async function Home() {
  const avgScores = await getAverageScores({
    start: subtractMonths(360),
    end: subtractMonths(0), // today
  });

  const game = await getLatestCompleteGame();

  return (
    <main className="flex flex-col gap-8 ">
      {/* <pre>{JSON.stringify(game, null, 2)}</pre> */}
      <div>
        <h2 className="text-4xl font-bold pb-2">Averages</h2>
        <div className="relative">
          <div className="flex space-x-4 overflow-x-scroll">
            <Average months={1} />
            <Average months={3} />
            <Average />
          </div>
          <div className="pointer-events-none absolute -right-4 w-4/12 top-0 bottom-0 bg-gradient-to-l from-transparent lg:from-transparent"></div>
        </div>
      </div>
      <div>
        <h2 className="text-4xl font-bold pb-2">Scores</h2>
        <ScatterPlot avgScores={avgScores} />
      </div>

      {/* abstract to component  */}
      {/* <hr style={{ width: "100%", margin: "10px 0" }} />
        <h3>last set</h3> */}
      {/* pull games from last date entered */}
      <ScoreBoard game={game} />
    </main>
  );
}
