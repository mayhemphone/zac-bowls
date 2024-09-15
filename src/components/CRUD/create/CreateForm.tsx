"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

import { RelatedSelect } from "@/components/RelatedSelect";
import { InsertManufacturer, tables } from "@/db/schema";
import {
  buildFormInputs,
  generateZodSchema,
  inputType,
} from "@/util/drizzleToZod";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QueryResult } from "@vercel/postgres";
import { useRouter } from "next/navigation";

export type Form = UseFormReturn<
  {
    [x: string]: any;
  },
  any,
  undefined
>;

export const returnInput = (
  form: Form,
  column: any,
  type: string,
  name: string
) => {
  // I'm filtering out id fields, so the rest of serial types are relational ids
  //  would be cool to populate a dropdown with all the avaialble related items to select the id

  // For instance, if this is a leagueTrimester,
  //  I'd want to populate a dropdown with all the leagues that are available
  if (type === "PgInteger" && name.slice(-2) === "Id") {
    return <RelatedSelect key={name} form={form} col={column} />;
  }

  return (
    <FormField
      key={name}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className="">{name}</FormLabel>
          <FormControl>
            <Input
              className=""
              {...field}
              type={inputType(type)}
              {...form.register(name)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default function CreateForm({
  tableName,
  insertRecord,
}: {
  tableName: keyof typeof tables;
  insertRecord: (data: { [x: string]: any }) => Promise<QueryResult<any>>;
}) {
  const router = useRouter();
  const dynamicSchema = generateZodSchema(tables[tableName]);

  type TableGuess = (typeof tables)[keyof typeof tables];

  const form = useForm<z.infer<typeof dynamicSchema>>({
    resolver: zodResolver(dynamicSchema),
  });

  const onSubmit: SubmitHandler<any> = async (
    data: z.infer<typeof dynamicSchema>
  ) => {
    console.log("😀");
    console.log({
      title: "You submitted the following values:",
      data,
    });

    try {
      const res = await insertRecord(data as InsertManufacturer);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(res, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.error("❌ InsertRecord Transaction failed: ", error);
      throw error; // rethrow the error after logging it
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Create {tableName.slice(0, -1)}</DialogTitle>
        <DialogDescription>
          Manually insert a new {tableName.slice(0, -1)}
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            {buildFormInputs<TableGuess>(form, tables[tableName])}
            <DialogFooter className="sm:justify-start">
              <div className="flex-1">
                <Button type="submit">Submit</Button>
              </div>
              <div className="flex gap-4">
                <Button type="reset" onClick={form.reset}>
                  Reset
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={form.reset}
                  >
                    Close
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
}
