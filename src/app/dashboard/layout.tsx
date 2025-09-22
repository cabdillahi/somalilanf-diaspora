"use client";
import { DashboardHeader } from "@/components/dashboard/home/dashboard-header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useWhoIamQuery } from "@/services/auth/auth-api";
import { Loader2Icon } from "lucide-react";

export default function DashboardLayout({ children }: any) {
  const { isLoading } = useWhoIamQuery();

  return (
    <div className="flex h-screen w-full transition-all duration-300">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader2Icon className="animate-spin " />
        </div>
      ) : (
        <>
          <Sidebar />
          <main className="flex-grow p-4 overflow-y-auto">
            <DashboardHeader />
            {children}
          </main>
        </>
      )}
    </div>
  );
}
