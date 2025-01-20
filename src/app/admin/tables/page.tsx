import { auth, signIn } from "@/auth";
import AdminCard from "@/components/AdminCard";
import { tables } from "@/db/schema";
import { redirect } from "next/navigation";

type Props = {};

const Page = async ({}: Props) => {
  const session = await auth();

  if (!session?.user) return signIn();
  if (session?.user.email !== "mayhemphone@gmail.com") return redirect("/");

  // a search for these cards could be nice ?

  const cards = Object.entries(tables).map(([key, value]) => (
    <AdminCard
      key={key}
      title={key}
      description={`Manage ${key} in the database`}
      href={`/admin/tables/${key}/1`}
    />
  ));
  return (
    <>
      <h1 className="text-3xl mb-6">Admin</h1>
      <div className="flex flex-col gap-4">{cards}</div>
    </>
  );
};

export default Page;
