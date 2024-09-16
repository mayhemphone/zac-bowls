// components/CRUD/create/CreateForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
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

import { insertSchemas, tables } from "@/db/schema";
import { buildFormInputs, inputType } from "@/util/drizzleToZod";

import { RelatedSelect } from "@/components/RelatedSelect";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InsertRecordFunction, TableName } from "@/db/schema";
import { Dispatch, SetStateAction } from "react";

export const returnInput = (
  form: any, // can't get this typed
  column: any, // cant' get this typed
  type: string,
  name: string
) => {
  // console.log({ form, column, type, name });

  // I'm filtering out id fields
  // so if a type integer and has Id at the end, it's a relational id

  if (type === "PgInteger" && name.slice(-2) === "Id") {
    return <RelatedSelect key={name} form={form} col={column} />;
  }

  // could do more overrides here based off field name, etc stored in a config

  return (
    <FormField
      key={name}
      control={form.control}
      name={name}
      defaultValue={""}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className="">{name}</FormLabel>
          <FormControl>
            <Input
              className=""
              {...field}
              type={inputType(type)}
              // {...form.register(name)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface CreateFormProps<T extends TableName> {
  tableName: T;
  insertRecord: InsertRecordFunction<T>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateForm = <T extends TableName>({
  tableName,
  insertRecord,
  setOpen,
}: CreateFormProps<T>) => {
  const dynamicSchema = insertSchemas[tableName];
  type DynamicType = z.infer<typeof dynamicSchema>;

  const form = useForm<DynamicType>({
    resolver: zodResolver(dynamicSchema),
  });

  const formFieldNamesArr = Object.keys(form.getValues());

  const onSubmit: SubmitHandler<DynamicType> = async (data) => {
    console.log("😀");
    console.log({
      title: "You submitted the following values:",
      data,
    });
    try {
      const res = await insertRecord(data);
      form.reset();
      setOpen(false);
      toast({
        title: `${tableName} added successfully`,
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(res, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.error("❌ InsertRecord Transaction failed: ", error);
      throw error; // Rethrow the error after logging it
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
            onSubmit={form.handleSubmit(onSubmit)} // how can i reset the form too?
            className="w-full space-y-6"
          >
            {buildFormInputs(form, tables[tableName])}
            <DialogFooter className="sm:justify-start">
              <div className="flex-1">
                <Button
                  type="reset"
                  variant="secondary"
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    form.reset(); //TODO:  wish i could set focus on the first field
                    e.currentTarget.blur(); // might be able to with some serious shit off this current target
                  }}
                >
                  Reset
                </Button>
              </div>
              <div className="">
                <Button type="submit">Submit</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

export default CreateForm;
