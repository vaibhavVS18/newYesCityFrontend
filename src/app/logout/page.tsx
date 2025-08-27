'use client';

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      console.log("fetching");
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // 👈 important: send cookies
      });

      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-lg"
      >
        Logout
      </button>
    </div>
  );
}
