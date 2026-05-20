import { notFound } from "next/navigation";
import { getPost } from "@/data/queries";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  // console.log(`ID: ${id}`);

  if (!Number.isInteger(id)) {
    notFound();
  }

  const post = await getPost(id);

  if (!post) notFound();

  return (
    <>
      <main>
        <ul>
          <li key={post.id}>
            <span title={"ID: " + id.toString()}>{post.title}</span>
            <p>{post.description}</p>
          </li>
        </ul>
      </main>
    </>
  );
}
