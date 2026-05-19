"use client";

import { useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type PostsClientProps = {
  posts: Post[];
};

export default function PostsClient({ posts }: PostsClientProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <ul>
      {posts.map((post) => {
        const isSelected = selectedId === post.id;

        return (
          <li key={post.id}>
            {/* Vorschau-Box: Wird direkt oberhalb des li-Contents angezeigt, wenn ausgewählt */}
            {isSelected && (
              <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <button onClick={() => setSelectedId(null)}>Close</button>
              </div>
            )}

            {/* Standard Zeile */}
            <div>
              <span>{post.title}</span>
              {!isSelected && (
                <button onClick={() => setSelectedId(post.id)}>Preview</button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
