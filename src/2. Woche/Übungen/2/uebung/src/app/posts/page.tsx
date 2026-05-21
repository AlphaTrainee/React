import PostsClient from "./PostsClient";

type Post = {
  id: number;
  title: string;
  body: string;
  tags: Array<string>;
  reaction: {
    like: number;
    dislike: number;
  };
  userId: number;
};

async function getLatestPosts(): Promise<Post[]> {
  const res = await fetch("https://dummyjson.com/posts?limit=8", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data: { posts: Post[] } = await res.json();
  return data.posts;
}

export default async function PostsPage() {
  const posts = await getLatestPosts();

  return (
    <main className="mx-auto max-w-[900px] p-6">
      <h1 className="mb-3 text-[28px] font-semibold">Latest Posts</h1>
      <p className="mb-6 text-sm text-neutral-600">
        RSC lädt Daten. Client Component übernimmt State + Events
        (Search/Preview).
      </p>

      <PostsClient posts={posts} />
    </main>
  );
}
