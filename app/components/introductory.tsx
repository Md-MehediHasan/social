"use client";
import Link from "next/link";
import { signIn,useSession } from "next-auth/react";
import { useEffect } from "react";

export function Introductory() {
  const { data: session,status } = useSession();


  return (
     <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      {status != "loading" && (<>
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold">LEAN</h1>
        <p className="mt-4 text-lg opacity-70">
          Leather Engineers and Association for Networking
        </p>
        <p className="mt-2 text-base opacity-80">
          A social platform connecting leather and footwear engineers, leather goods
          manufacturers, students, entrepreneurs, and industry professionals.
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-10 w-full max-w-sm">
        <Link
          href="/guest"
          className="text-center py-3 rounded-lg border border-gray-700 hover:bg-gray-200 transition"
        >
          Visit as Guest
        </Link>

       
        <button
                  onClick={() => signIn("google",{ callbackUrl: "/" })}
                  className="flex items-center justify-center gap-2 bg-red-600 text-white w-full py-3 rounded-lg hover:bg-red-700"
                >
                  <img src="/icons/google-icon.svg" className="h-5 w-5" alt="google" />
                  Sign up with Google
                </button>
    
      </div>
      </>)}
      {status === "loading" && (
        <p>Loading...</p>
      )}
    </section>
  );
}