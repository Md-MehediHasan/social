"use client";

import { signIn } from "next-auth/react";

export default function Signup() {
  async function handleGoogleSignUp() {
    const result = await signIn("google");
    console.log(result);
  }
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-[350px] text-center">

        <h1 className="text-2xl font-bold mb-6">Join DAKPION</h1>

        <button
          onClick={handleGoogleSignUp}
          className="flex items-center justify-center gap-2 bg-red-600 text-white w-full py-3 rounded-lg hover:bg-red-700"
        >
          <img src="/icons/google-icon.svg" className="h-5 w-5" alt="google" />
          Sign up with Google
        </button>

      </div>
    </main>
  );
}
