import { auth, signIn } from "@/auth";
import AdminCard from "@/components/AdminCard";
import { tables } from "@/db/schema";
import { redirect } from "next/navigation";

type Props = {};

const Page = async ({}: Props) => {
  const session = await auth();

  if (!session?.user) return signIn();
  if (session?.user.email !== "mayhemphone@gmail.com") return redirect("/");

  // need a search for these cards
  // can i auto create these by mapping over tables?

  const cards = Object.entries(tables).map(([key, value]) => (
    <AdminCard
      key={key}
      title={key}
      description={`Manage ${key} in the database`}
      href={`/admin/${key}/1`}
    />
  ));
  return (
    <>
      <h1 className="text-3xl mb-6">Admin</h1>
      <div className="flex flex-col gap-4">
        {cards}
        {/* <AdminCard
          title="Leagues"
          description="Manage leagues in the database"
          href={"/admin/leagues/1"}
        />
        <AdminCard
          title="Games"
          description="Manage games in the database"
          href={"/admin/games/1"}
        />
        <AdminCard
          title="Links"
          description="Manage links in the database"
          href={"/admin/links/1"}
        />
        <AdminCard
          title="Manufacturers"
          description="Manage manufacturers in the database"
          href={"/admin/manufacturers/1"}
        /> */}
      </div>
    </>
  );
};

export default Page;
