import { GoToFirstRouterButton } from "@/components/GoToFirstPostButton";
import { posts } from "@/data/posts";
import Link from "next/link";

export default function Posts() {
  return (
    <main>
      <h2>Posts</h2>
      <GoToFirstRouterButton />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
