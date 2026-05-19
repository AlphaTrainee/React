"use client";

import { useRouter } from "next/navigation";
export function GoToFirstRouterButton() {
  const router = useRouter();

  function handleClick() {
    router.push("posts/1");
  }

  return <button onClick={handleClick}>Gehe zum ersten Post</button>;
}
