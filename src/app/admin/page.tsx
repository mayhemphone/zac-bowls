import { auth, signIn } from "@/auth";
import AdminCard from "@/components/AdminCard";
import { redirect } from "next/navigation";

type Props = {};

const Page = async ({}: Props) => {
  const session = await auth();

  if (!session?.user) return signIn();
  if (session?.user.email !== "mayhemphone@gmail.com") return redirect("/");

  return (
    <>
      <h1 className="text-3xl mb-6">Admin</h1>
      <div className="flex flex-col gap-4">
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
      </div>
    </>
  );
};

export default Page;
