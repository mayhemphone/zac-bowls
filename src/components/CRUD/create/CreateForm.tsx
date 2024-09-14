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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tables } from "@/db/schema";
import {
  buildFormInputs,
  generateZodSchema,
  inputType,
} from "@/util/drizzleToZod";

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
              // ref={field.ref} // Ensure ref is passed for registration
              // onChange={field.onChange} // Handle change events
              {...form.register(name)}
            />
          </FormControl>
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default function InputForm({
  tableName,
}: {
  tableName: keyof typeof tables;
}) {
  const dynamicSchema = generateZodSchema(tables[tableName]);

  type TableGuess = (typeof tables)[keyof typeof tables];

  const form = useForm<z.infer<typeof dynamicSchema>>({
    resolver: zodResolver(dynamicSchema),
  });

  const onSubmit: SubmitHandler<any> = (
    data: z.infer<typeof dynamicSchema>
  ) => {
    console.log("😀");
    console.log({
      title: "You submitted the following values:",
      data,
    });
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Card className="w-11/12   shadow-md max-w-4xl md:w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle>Create {tableName.slice(0, -1)}</CardTitle>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <CardContent>
            {buildFormInputs<TableGuess>(form, tables[tableName])}
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
