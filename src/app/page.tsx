import Average from "@/components/Average";
import { getAverageScores } from "@/db/queries";

export default async function Home() {
  const avgScores = getAverageScores();

  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <p>zac likes to bowl</p>
        <Average />
      </div>
    </main>
  );
}
