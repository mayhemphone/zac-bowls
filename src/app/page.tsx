import Average from "@/components/Average";

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
      <div>
        <p>zac likes to bowl</p>
        <Average />
      </div>
    </main>
  );
}
