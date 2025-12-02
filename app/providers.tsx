"use client";

import { SessionProvider} from "next-auth/react";
import { Session } from "next-auth"; 
import { ReactNode } from "react";

interface NextAuthProviderProps {
  children: ReactNode;
  session?: Session | null;
}

export const NextAuthProvider = ({ children, session }: NextAuthProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
