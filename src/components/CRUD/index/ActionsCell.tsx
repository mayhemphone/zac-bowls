import FilePenIcon from "@/components/icons/FilePen";
import TrashIcon from "@/components/icons/Trash";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { revalidatePath } from "next/cache";

type Props = {
  deleteFunction: (id: number) => void;
  // handleEditItem: (id: number) => void;
  id: number;
  tableName: string;
};

const ActionsCell = ({ id, deleteFunction, tableName }: Props) => {
  return (
    <TableCell className="w-[120px]">
      <div className="flex items-center gap-2">
        {/*
            mimic below when we have edit functionality
            or may end up just being a link to an edit page
            or may be similar to create form compoennt,
            or added functinoality to it
        */}
        <Button size="icon" variant="ghost">
          <FilePenIcon className="h-4 w-4" />
        </Button>

        <form
          action={async () => {
            "use server";
            deleteFunction(id);
            revalidatePath(`/admin/${tableName}/1`);
          }}
        >
          <input type="hidden" name="id" value={id} />
          <Button type="submit" size="icon" variant="ghost">
            <TrashIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </TableCell>
  );
};

export default ActionsCell;
