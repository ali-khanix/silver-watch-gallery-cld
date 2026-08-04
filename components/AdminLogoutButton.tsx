"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const AdminLogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin-login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors cursor-pointer"
    >
      <LogOut size={16} />
      خروج
    </button>
  );
};

export default AdminLogoutButton;
