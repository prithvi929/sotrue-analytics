"use client";
import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status, router]);

  if (status === "unauthenticated")
    return (
      <main className="flex justify-center items-center min-h-screen">
        {children}
      </main>
    );

  return (
    <div className="h-full min-h-screen w-full flex justify-center items-center">
      <Spinner />
    </div>
  );
}
