"use client";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md sticky top-0 z-40">
      <h1 className="text-3xl font-bold">DAKPION</h1>

      <button className="text-xl">⋮</button>
    </div>
  );
}
