import { auth } from "@/auth";
import Link from "next/link";

const SignedIn = async () => {
  const session = await auth();
  if (session?.user?.email !== "mayhemphone@gmail.com") return null;
  return (
    <div>
      <Link href={"/admin"}>👀</Link>
    </div>
  );
};

export default SignedIn;
