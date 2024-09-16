"use client";

import Link from "next/link";

import { queryTable } from "@/actions/queryTable";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isTableName } from "@/db/schema";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

export function RelatedSelect<T extends Record<string, any>>({
  form,
  col,
}: {
  form: UseFormReturn<T>;
  col: any; // TODO: infer the type of the column from the table name.  similar to the create form create function
}) {
  const [relatedData, setRelatedData] = useState<any[]>([]);

  useEffect(() => {
    console.log("👀 relatedData", relatedData);
  }, [relatedData]);

  useEffect(() => {
    const getRelatedData = async (colName: string) => {
      const tableName = `${colName.slice(0, -2)}s`;
      console.log("FETCHING RELATED DATA:", tableName);
      if (isTableName(tableName)) {
        const relatedData = await queryTable(tableName);

        console.log({ relatedData });
        setRelatedData(
          relatedData.map((item) => ({
            id: item.id,
            // @ts-ignore Because i am building the string for the related field, the return type is not inferred
            name: item.name || item.week,
          }))
        );
      }
    };
    getRelatedData(col.name);
  }, [col]);

  return (
    <FormField
      control={form.control}
      name={col.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{field.name.slice(0, -2)}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={relatedData.length === 0}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    relatedData.length > 0
                      ? `Select a ${col.name.slice(0, -2)}`
                      : "No related data available"
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {relatedData.length > 0 &&
                relatedData.map((item, i) => (
                  <SelectItem key={i} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormDescription>
            You can manage email addresses in your{" "}
            <Link href="/examples/forms">email settings</Link>.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
