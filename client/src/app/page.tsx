"use client"

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button"
import { useAuthContext } from "@/components/context/AuthContext";

export default function Home() {
  const { isSignedIn } = useAuthContext()

  return (
    <div>
      <h1 className="text-3xl text-center text-primary">Mat auth project to test authentication in React</h1>
      <div className="flex justify-center space-x-5 flex-wrap mt-5">
        {!isSignedIn ? (
            <>
              <Link href={"/sign-in"} className={buttonVariants({ variant: "outline" })} title="Sign In">
                Sign In
              </Link>

              <Link href={"/sign-up"} className={buttonVariants({ variant: "secondary" })} title="Sign Up">
                Sign Up
              </Link>
            </>
        ) : (
            <>
              <Link href={"/dashboard"} className={buttonVariants({ variant: "outline" })} title="Dashboard">
                Dashboard
              </Link>

              <Button variant="secondary" title="Logout">
                Logout
              </Button>
            </>
        )}
      </div>
    </div>
  );
}
