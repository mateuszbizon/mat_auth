import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl text-center text-primary">Mat auth project to test authentication in React</h1>
      <div className="flex justify-center space-x-5 flex-wrap mt-5">
        <Link href={"/sign-in"} className={buttonVariants({ variant: "outline" })} title="Sign In">
          Sign In
        </Link>

        <Link href={"/sign-up"} className={buttonVariants({ variant: "secondary" })} title="Sign Up">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
