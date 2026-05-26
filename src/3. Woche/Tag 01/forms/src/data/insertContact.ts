import { createClient, type Client } from "@libsql/client";
import { Contact } from "./schema";

export async function insertContact({ name, email, reason, notes }: Contact) {
  let client: Client | undefined;
  let ok = true;

  try {
    client = createClient({
      url: "file:src/data/contacts.db",
    });

    await client.execute({
      sql: "INSERT INTO contacts(name, email, reason, notes) VALUES (?, ?, ?, ?)", // ? verhindert SQL Injections
      //FALSCH: Gefahr von SQL-Injections sql: `INSERT INTO contact(name, email, reason, notes) VALUES (${name}, ${email}, ${reason}, ${notes})` ,
      args: [name, email, reason, notes],
    });
  } catch (err) {
    console.log(err);
    ok = false;
  }

  if (client) {
    client.close();
  }

  return { ok };
}
