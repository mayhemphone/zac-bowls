import { auth, signIn } from "@/auth";
import Index from "@/components/CRUD/Index";
import { redirect } from "next/navigation";

type Props = {};

const Page = async ({}: Props) => {
  const session = await auth();

  if (!session?.user) return signIn();
  if (session?.user.email !== "mayhemphone@gmail.com") return redirect("/");

  return (
    <>
      <h1 className="text-3xl">Admin</h1>
      <Index />
    </>
  );
};

export default Page;
