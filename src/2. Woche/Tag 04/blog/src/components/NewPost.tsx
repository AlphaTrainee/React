"use client";

import { createPost } from "@/data/createPost";

export function NewPost() {
  async function handleClick() {
    await createPost("New Post", "New Post Description");
  }

  return (
    <div className="actions">
      <button type="button" onClick={handleClick}>
        Erstelle neuen Post
      </button>
    </div>
  );
}
