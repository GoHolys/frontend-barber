import Link from "next/link";
import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions/auth/auth";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md">
      <Link href="/" className="text-xl font-bold">
        Dog Barber
      </Link>
      {!session ? (
        <Link href="/sign-in">
          <button>Sign In</button>
        </Link>
      ) : (
        <form action={handleSignOut}>
          <button type="submit">Sign Out</button>
        </form>
      )}
    </nav>
  );
}
