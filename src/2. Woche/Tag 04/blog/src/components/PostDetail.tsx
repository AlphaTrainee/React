import Link from "next/link";
import { getPost } from "@/data/queries";

export async function PostDetail({ id }: { id: number }) {
  const post = await getPost(id);

  if (!post) {
    return <p>Entry not found</p>;
  }

  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </>
  );
}
