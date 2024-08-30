import { auth, signIn } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {};

const Page = async ({}: Props) => {
  const session = await auth();

  if (!session?.user) return signIn();
  if (session?.user.email !== "mayhemphone@gmail.com") return redirect("/");

  return (
    <>
      <h1 className="text-3xl mb-6">Admin</h1>
      <Link href={"/admin/games/1"}>
        <Card>
          <CardHeader>
            <CardTitle>Games</CardTitle>
          </CardHeader>
          <CardContent>Manage games in the database &nbsp;&gt;&gt;</CardContent>
        </Card>
      </Link>
    </>
  );
};

export default Page;
