"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function SignInButton() {
  const { data: session } = useSession();


  if (session && session.user) {
    return (
      <div>
        <p>{session.user.firstName}</p>
        <Link href="api/auth/signout">Sign out</Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="sign-in">Sign In</Link>
      <Link href="sign-up">Sign Up</Link>
    </div>
  );
}
