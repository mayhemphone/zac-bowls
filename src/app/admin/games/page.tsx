import { redirect } from "next/navigation";

type Props = {};

const Page = (props: Props) => {
  return redirect("/admin/games/1");
};

export default Page;
