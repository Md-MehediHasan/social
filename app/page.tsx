import Link from "next/link";
import { Introductory } from "./components/introductory";

export const metadata = {
  title: "Welcome to LEAN",
  description:
    "Join LEAN — a networking platform for Leather Engineers, Footwear Engineers, Leather Goods producers, students & professionals.",
};

export default function Home() {
  return (
   <Introductory/>
  );
}
