"use client";

import { useState } from "react";

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

type PostsClientProps = {
  posts: Post[];
};

export default function PostsClient({ posts }: PostsClientProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section>
      <ul>
        {posts.map((post) => {
          const isSelected = selectedId === post.id;

          return (
            <li key={post.id}>
              {/* Vorschau-Box: Wird direkt oberhalb des li-Contents angezeigt, wenn ausgewählt */}
              {isSelected && (
                <div>
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                  <button onClick={() => setSelectedId(null)}>Close</button>
                </div>
              )}

              {/* Standard Zeile */}
              <div>
                <span>{post.title}</span>
                {!isSelected && (
                  <button onClick={() => setSelectedId(post.id)}>
                    Preview
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
