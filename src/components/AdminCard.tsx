import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: string;
};

const AdminCard = ({ title, description, href }: Props) => {
  return (
    <Link href={href}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {description}
            &nbsp;&gt;&gt;
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AdminCard;
