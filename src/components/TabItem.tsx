"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type TabItemProps = {
  href: string;
  title: string;
  icon: string;
};

const TabItem = ({ href, title, icon }: TabItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;
  return (
    <div
      className={`ml-1.5 flex items-center pl-5 py-2 my-2 cursor-pointer ${
        selected ? "rounded-[20px_0px_0px_17px] bg-[#1C2545]" : ""
      }`}
      onClick={() => {
        router.push(href);
      }}
    >
      <Image src={icon} alt={`${title} icon`} width={20} height={20} style={{ width: "auto", height: "auto" }}/>
      <div className="text-base text-white pl-2.5">{title}</div>
    </div>
  );
};

export default TabItem;
