//import { GoToFirstRouterButton } from "@/components/GoToFirstPostButton";
import { posts } from "@/data/posts";
import Link from "next/link";

export default async function Posts({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // 1. Das Promise der searchParams korrekt auflösen
  // const resolvedParams = await searchParams;
  // const criteria = resolvedParams.criteria;
  const { criteria } = await searchParams;

  const resolvedPosts =
    typeof criteria === "string"
      ? posts.filter((post) =>
          post.title.toLowerCase().includes(criteria.toLowerCase()),
        )
      : posts;
  const resolveHeading =
    typeof criteria === "string" ? `Posts for ${criteria}` : "Posts";
  return (
    <main>
      <h2>{resolveHeading}</h2>
      {/* <GoToFirstRouterButton /> */}
      <ul>
        {resolvedPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
