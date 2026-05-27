"use server";

// import { createClient, type Client } from "@libsql/client";
import { db as client } from "../lib/db";
import { contactSchema } from "./schema";
import { redirect } from "next/navigation";
import { z } from "zod";

type Err = { message: string };

type FieldErrors = {
  name: Err | null;
  email: Err | null;
  reason: Err | null;
};

type ActionState = {
  result: boolean;
  error: string;
  formData: FormData; // Kopie der vorherigen Form Values
  errors: FieldErrors;
};

export async function insertContact(
  previousState: ActionState,
  formData: FormData,
) {
  const contact_obj = Object.fromEntries(formData);
  const parsedResult = contactSchema.safeParse(contact_obj);

  // let client: Client | undefined
  let result = true;
  let error = "";

  if (!parsedResult.success) {
    console.log("falsches datenformat");
    return {
      result: false,
      error: "could not save",
      formData,
      errors: formatZodErrors(parsedResult.error),
    };
  }

  const { name, email, reason, notes } = parsedResult.data;

  try {
    /*       
        client = createClient({
            url: 'file:src/data/forms.db'
        })
 */
    await client.execute({
      sql: "INSERT INTO contact (name, email, reason, notes) VALUES (?, ?, ?, ?)", // ? verhindert SQL Injections
      //FALSCH: Gefahr von SQL-Injections sql: `INSERT INTO contact(name, email, reason, notes) VALUES (${name}, ${email}, ${reason}, ${notes})` ,
      args: [name, email, reason, notes ?? null],
    });
  } catch (e) {
    result = false;
    error = "Probleme beim Speichern ";
  }

  if (client) {
    client.close();
  }

  if (result) {
    redirect(`/thanks/?name=${encodeURIComponent(name)}`);
  }

  return {
    result,
    error,
    formData,
    errors: { name: null, email: null, reason: null },
  };
}

function formatZodErrors(error: z.ZodError): FieldErrors {
  const formattedErrors: FieldErrors = {
    name: null,
    email: null,
    reason: null,
  };

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (field === "name" && !formattedErrors.name)
      formattedErrors.name = { message: issue.message };
    if (field === "email" && !formattedErrors.email)
      formattedErrors.email = { message: issue.message };
    if (field === "reason" && !formattedErrors.reason)
      formattedErrors.reason = { message: issue.message };
  }

  return formattedErrors;
}
