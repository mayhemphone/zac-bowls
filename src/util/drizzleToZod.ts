import { z } from "zod";

import { PgColumn, PgTableWithColumns } from "drizzle-orm/pg-core";

import { returnInput } from "@/components/CRUD/create/CreateForm";

// convert drizzle type to zod type
export const drizzleToZod = (field: any): any => {
  const {
    columnType,
    config,
    config: { notNull },
  } = field;

  switch (columnType) {
    case "PgInteger":
    case "PgSerial":
    case "PgNumeric":
      return notNull
        ? z.coerce.number().positive({ message: "This field is required" })
        : z.coerce.number().nullable();

    case "PgVarchar": {
      const maxLength = config?.length || 255;
      return notNull
        ? z
            .string()
            .max(maxLength, { message: `Maximum length is ${maxLength}` })
            .min(1, { message: "This field is required" })
        : z.string().max(maxLength).nullable();
    }

    case "PgText":
      return notNull
        ? z.string({ message: "This field is required" })
        : z.string().nullable();

    case "PgDateString":
      return notNull ? z.coerce.date() : z.coerce.date().nullable();

    default:
      throw new Error(`Unsupported field type: ${columnType}`);
  }
};

// creating zod schema from drizzle table
export const generateZodSchema = (table: any) => {
  const schemaShape: Record<string, z.ZodTypeAny> = {};

  // Iterate over each field in the Drizzle table (not table.schema)
  // filter out id field.
  for (const [key, value] of Object.entries(table).filter(
    ([key]) => key !== "id"
  )) {
    schemaShape[key] = drizzleToZod(value);
  }

  return z.object(schemaShape);
};

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

export const buildFormInputs = <T>(
  form: any,
  columns: PgTableWithColumns<any>
) => {
  return Object.entries(columns)
    .filter(([key]) => key !== "id")
    .map(([key, value]) => returnInput(form, value, value.columnType, key));
};
