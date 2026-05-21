import { db } from "@/lib/db";

export function DeleteButton({ id }: { id: number }) {
  async function deleteProduct() {
    "use server";
    await db.execute({
      sql: "DELETE FROM products WHERE id = ?",
      args: [id],
    });
  }

  return (
    <button type="button" onClick={deleteProduct}>
      Delete
    </button>
  );
}
