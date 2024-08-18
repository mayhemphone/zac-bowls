import Average from "@/components/Average";
import ScatterPlot from "@/components/charts/ScatterPlot";
import { getAverageScores } from "@/db/queries";
import { subtractMonths } from "@/util/dates";

export default async function Home() {
  const avgScores = await getAverageScores({
    start: subtractMonths(360),
    end: subtractMonths(0), // today
  });

  return (
    <main className="mt-4 flex flex-col gap-4 ">
      <h2 className="text-4xl font-bold">Averages</h2>
      <div className="relative">
        <div className="flex  space-x-4 overflow-x-scroll pb-4">
          <Average months={1} />
          <Average months={3} />
          <Average />
        </div>
        <div className="pointer-events-none absolute -right-4 w-4/12 top-0 bottom-0 bg-gradient-to-l from-transparent lg:from-transparent"></div>
      </div>

      <h2 className="text-4xl font-bold">Scores</h2>
      <ScatterPlot avgScores={avgScores} />

      {/* abstract to component  */}
      {/* <hr style={{ width: "100%", margin: "10px 0" }} />
        <h3>last set</h3> */}
      {/* pull games from last date entered */}
    </main>
  );
}
