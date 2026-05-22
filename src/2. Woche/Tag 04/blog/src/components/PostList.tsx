"use client";

import Link from "next/link";
import { getAllPosts, getFilteredPosts } from "@/data/queries";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./Loading";
import { ErrorAlert } from "./ErrorAlert";

export function PostList({
  criteria,
}: {
  criteria: string | string[] | undefined;
}) {
  const {
    data: resolvedPosts,
    isPending,
    error,
  } = useQuery({
    queryKey: ["posts", criteria],
    queryFn: () => {
      if (typeof criteria === "string") {
        return getFilteredPosts(criteria);
      }
      return getAllPosts();
    },
  });

  if (isPending) return <Loading />;
  if (error) return <ErrorAlert error={error} />;

  return (
    <ul>
      {resolvedPosts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
          <p>{post.description}</p>
        </li>
      ))}
    </ul>
  );
}
