"use client";

import { createPost } from "@/data/createPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function NewPost() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) => createPost(title, description),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
  function handleClick() {
    mutate({
      title: "Neuer Post (mit useMutation)",
      description: "Description New Post",
    });
  }

  return (
    <div className="actions">
      <button type="button" onClick={handleClick}>
        {isPending ? "Server erstellt neuen Post ... " : "neuen Post erstellen"}
      </button>
      {isError && <span role="alert">Unerwarteter Fehler aufgetreten</span>}
      {isSuccess && (
        <span role="alert" className="success">
          Post wurde erstellt
        </span>
      )}
    </div>
  );
}
