"use client";

import Link from "next/link";
import Form from "next/form";

import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  // console.log(`Pathname: ${pathname}`);
  return (
    <header>
      <Link className={pathname === "/" ? "active" : ""} href="/">
        Home
      </Link>
      <Link className={pathname === "/posts" ? "active" : ""} href="/posts">
        Posts
      </Link>
      <Form action="/posts">
        <input
          type="search"
          name="criteria"
          placeholder="search"
          aria-label="Search blog posts"
        />
      </Form>
    </header>
  );
}
