import Average from "@/components/Average/Average";

export default async function Home() {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>zac likes to bowl</p>
        <Average />
        {/* abstract to component  */}
        {/* <hr style={{ width: "100%", margin: "10px 0" }} />
        <h3>last set</h3> */}
        {/* pull games from last date entered */}
      </div>
    </main>
  );
}
