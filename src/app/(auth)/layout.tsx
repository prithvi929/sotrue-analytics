"use client";
import Spinner from "@/components/Spinner";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface LayoutProps {
  children: React.ReactNode;
}

const LoadingSpinner = () => (
  <div className="h-full min-h-screen w-full flex justify-center items-center">
    <Spinner />
  </div>
);

export default function Layout({ children }: Readonly<LayoutProps>) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        {children}
      </main>
    );
  }

  return null;
}