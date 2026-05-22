"use client";

import { getPost } from "@/data/queries";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./Loading";
import { ErrorAlert } from "./ErrorAlert";

export function PostDetail({ id }: { id: number }) {
  const {
    data: post,
    isPending,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => {
      return getPost(id);
    },
  });

  if (isPending) return <Loading />;
  if (error) return <ErrorAlert error={error} />;
  if (!post) return <p>Entry not found</p>;

  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </>
  );
}
