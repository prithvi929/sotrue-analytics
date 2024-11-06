"use client";
import Spinner from "@/components/Spinner";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [userSession, setUserSession] = useState<string | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("user");
      setUserSession(session);
      setSessionLoading(false);
      console.log("Session loaded:", session);
    }
  }, []);

  useEffect(() => {
    if (!loading && !sessionLoading) {
      if (user || userSession) {
        router.push("/");
      }
    }
  }, [user, userSession, loading, sessionLoading, router]);

  if (loading || sessionLoading) {
    return (
      <div className="h-full min-h-screen w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (user || userSession) {
    return null; 
  }

  return (
    <main className="flex justify-center items-center min-h-screen">
      {children}
    </main>
  );
}
