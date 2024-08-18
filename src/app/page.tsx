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
    <main className="mt-4 flex flex-col gap-4">
      <h2 className="text-4xl font-bold">Averages</h2>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        <Average />
        <Average months={3} />
        <Average months={1} />
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
