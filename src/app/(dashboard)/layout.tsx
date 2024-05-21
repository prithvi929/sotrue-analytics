"use client";
import Image from "next/image";
import TabItem from "@/components/TabItem";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "authenticated")
    return (
      <main className="flex max-h-screen">
        <section className="bg-[#061239] w-56 min-h-screen">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-6">
              <div className="pt-5 px-4">
                <div className="mb-2">
                  <Image
                    src="/logo.png"
                    alt="sotrue logo"
                    width={107}
                    height={47}
                    priority
                  />
                </div>
                <div className="p-2 bg-[#1E2742] rounded flex">
                  <Image
                    src="/search.svg"
                    alt="search icon"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none text-xs text-[#ffffff99] w-full"
                  />
                </div>
              </div>
              <div>
                <div className="text-[#8DABC4] text-sm mb-1.5 pl-7">
                  Application
                </div>
                <TabItem href="/" title="Overview" icon="/overview.png" />
                <TabItem
                  href="/review-posts"
                  title="Review Posts"
                  icon="/review.png"
                />
                <TabItem
                  href="/verify-profiles"
                  title="Verify Profiles"
                  icon="/verify.png"
                />
                <TabItem href="/users" title="Users" icon="/user.png" />
              </div>
              <div>
                <div className="text-[#8DABC4] text-sm mb-1.5 pl-7">Others</div>
                <TabItem
                  href="/notification"
                  title="Notification"
                  icon="/notification.png"
                />
              </div>
            </div>
            <div className="flex gap-2.5 items-center pl-5 py-2 my-2">
              <div className="h-8 w-8 bg-white rounded-full"></div>
              <div>
                <div className="text-xs font-bold text-white">
                  Prithviraj Prasad
                </div>
                <div
                  className="text-xs text-white text-[#ffffffB3] cursor-pointer"
                  onClick={() => signOut()}
                >
                  Log out
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="grow max-h-screen overflow-y-auto">
          {children}
        </section>
      </main>
    );

  return (
    <div className="h-full min-h-screen w-full flex justify-center items-center">
      <Spinner />
    </div>
  );
}
