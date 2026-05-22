"use client";

import { useState } from "react";
import { createPost } from "@/data/createPost";

export function NewPost() {
  const [status, setStatus] = useState<"pending" | "error" | "success">(
    "pending",
  );
  const [isMutating, setIsMutating] = useState(false);

  async function handleClick() {
    setIsMutating(true);
    const result = await createPost("New Post", "New Post Description");
    setStatus(result.ok ? "success" : "error");
    setIsMutating(false);
  }

  return (
    <div className="actions">
      <button type="button" onClick={handleClick}>
        {isMutating
          ? "Server erstellt neuen Post ... "
          : "neuen Post erstellen"}
      </button>
      {status === "error" && (
        <span role="alert">Unerwarteter Fehler aufgetreten</span>
      )}
      {status === "success" && (
        <span role="alert" className="success">
          Post wurde erstellt
        </span>
      )}
    </div>
  );
}
