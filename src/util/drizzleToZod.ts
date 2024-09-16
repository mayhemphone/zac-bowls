import { returnInput } from "@/components/CRUD/create/CreateForm";
import { PgColumn, PgTableWithColumns } from "drizzle-orm/pg-core";
import { UseFormReturn } from "react-hook-form";

// build inputs from table to match to the zod schema
export const inputType = (type: string) => {
  switch (type) {
    case "PgSerial":
      return "number";
    case "PgVarchar":
      return "text";
    case "PgInteger":
      return "number";
    case "PgDateString":
      return "date";
    default:
      return "text";
  }
};

type TableWithId = PgTableWithColumns<{
  name: string;
  schema: string | undefined;
  dialect: "pg";
  columns: {
    id: PgColumn;
    [key: string]: PgColumn;
  };
}>;

export const buildFormInputs = <T extends Record<string, any>>(
  form: UseFormReturn<T>,
  columns: PgTableWithColumns<any>
) => {
  "use client";

  return Object.entries(columns)
    .filter(([key]) => key !== "id")
    .map(([key, value]) => returnInput(form, value, value.columnType, key));
};
