import { auth, signIn } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";

type Props = {};

const Page = async ({}: Props) => {
  const session = await auth();

  if (!session?.user) return signIn();
  if (session?.user.email !== "mayhemphone@gmail.com") return redirect("/");

  // a search for these cards could be nice ?

  return (
    <>
      <h1 className="text-3xl mb-6">Admin</h1>
      <div className="flex flex-col gap-4">
        <Card className="">
          <Tabs defaultValue="current" className="w-full">
            <CardHeader>
              <CardTitle className="flex gap-2 w-full">
                <p className="flex-1">Leagues</p>
                <div>
                  <TabsList>
                    <TabsTrigger value="current">Current</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                    <TabsTrigger value="create-new">Create New</TabsTrigger>
                  </TabsList>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* abstract this out into a component */}
              {/* these are dynamically pulled from the database */}
              <TabsContent value="current">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <p className="bold">wSb Challenge League</p>
                      </TableCell>
                      <TableCell>
                        <p className="opacity-50">Mondays 6:50p</p>
                      </TableCell>
                      <TableCell>
                        <p className="opacity-50">Week 3 of 32</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <p className="bold">Century 21</p>
                      </TableCell>
                      <TableCell>
                        <p className="opacity-50">Thursdays 6:50p</p>
                      </TableCell>
                      <TableCell>
                        <p className="opacity-50">Week 3 of 32</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              {/* abstract this out into a component */}
              {/* these are dynamically pulled from the database */}
              <TabsContent value="past">
                <Table>
                  <TableRow>
                    <TableCell>
                      <p className="bold">Century 21</p>
                    </TableCell>
                    <TableCell>
                      <p className="opacity-50">Thursdays 6:50p</p>
                    </TableCell>
                    <TableCell>
                      <p className="opacity-50">Week 3 of 32</p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <p className="bold">wSb Challenge League</p>
                    </TableCell>
                    <TableCell>
                      <p className="opacity-50">Mondays 6:50p</p>
                    </TableCell>
                    <TableCell>
                      <p className="opacity-50">Week 3 of 32</p>
                    </TableCell>
                  </TableRow>
                </Table>
              </TabsContent>
              <TabsContent value="create-new">
                hybrid big Create form for a new league, league trimesters, etc
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle className="flex gap-2 w-full">
              <p className="flex-1">Latest Links</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>query for links without a game, and show those at the top</div>
            <div>show latest links, and a check mark for related game</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
