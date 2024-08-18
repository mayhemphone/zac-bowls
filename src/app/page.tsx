import Average from "@/components/Average";
import { getAverageScores } from "@/db/queries";
import { subtractMonths } from "@/util/dates";

export default async function Home() {
  const avgScores = await getAverageScores({
    start: subtractMonths(360),
    end: subtractMonths(0), // today
  });

  return (
    <main className="mt-4">
      <h1>Averages</h1>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        <Average avgScores={avgScores} />
        <Average avgScores={avgScores} months={3} />
        <Average avgScores={avgScores} months={1} />
      </div>
      {/* abstract to component  */}
      {/* <hr style={{ width: "100%", margin: "10px 0" }} />
        <h3>last set</h3> */}
      {/* pull games from last date entered */}
    </main>
  );
}
