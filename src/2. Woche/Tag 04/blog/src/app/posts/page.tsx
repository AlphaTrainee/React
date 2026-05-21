import { Suspense } from "react";
import { Loading } from "@/components/Loading";
import { GoToFirstPostButton } from "@/components/GoToFirstPostButtonm";
import { PostList } from "@/components/PostList";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { NewPost } from "@/components/NewPost";

export default async function Posts({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const criteria = (await searchParams).criteria;
  const resolvedHeading = criteria ? `Posts for ${criteria}` : "Posts";
  console.log(typeof criteria);
  return (
    <main>
      <h2>Posts</h2>
      <GoToFirstPostButton />
      <h2>{resolvedHeading}</h2>
      <NewPost />
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <PostList criteria={criteria} />
        </ErrorBoundary>
      </Suspense>
    </main>
  );
}
