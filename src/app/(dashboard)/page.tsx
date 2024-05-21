"use client";

import UserCard from "@/components/UserCard";
import { analyticsData, dailyData } from "@/utils/data";
import { getCurrentDate } from "@/utils/date";
import { generateUserIDs } from "@/utils/userId";

import Image from "next/image";
import { useEffect, useState } from "react";

type analyticsProps = {
  month: string;
  totalUsers: number;
  totalDailyActiveUsers: number;
  newUsers: number;
  totalSessions: string;
  verifiedUsers: number;
  exclusiveContent: number;
};

export default function Overview() {
  const options = [
    "Yesterday",
    "April",
    "March",
    "February",
    "January",
    "December",
    "November",
  ];
  const [dropdown, setDropdown] = useState(options[0]);
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<analyticsProps | null>(
    analyticsData[0]
  );

  useEffect(() => {
    if (dropdown !== "Yesterday") {
      const data = analyticsData.find(
        (data: analyticsProps) =>
          data.month.toLowerCase() === dropdown.toLowerCase()
      );
      setFilteredData(data || null);
    } else {
      const date = getCurrentDate();
      const data = dailyData.find(
        (data: analyticsProps) => data.month === date
      );
      setFilteredData(data || null);
    }
  }, [dropdown]);

  const users = generateUserIDs();
  const recentUsers = users.slice(0, 10);

  return (
    <div className="px-6 py-10">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-white text-[40px] leading-[52px] font-bold tracking-normal pb-2">
            Users Dashboard
          </div>
          <div className="text-[#ffffff99] text-base max-w-[485px]">
            Explore your users management dashboard with new modern and
            minimalist design view
          </div>
        </div>
        <div className="relative w-full max-w-56">
          <div
            onClick={() => setOpen(!open)}
            className="bg-[#061239] rounded px-2 py-3 w-full flex items-center justify-between cursor-pointer"
          >
            <div className="text-sm text-white">{dropdown}</div>
            <Image
              src="/calendar.svg"
              alt="calendar icon"
              width={24}
              height={24}
            />
          </div>
          {open && (
            <div className="bg-[#061239] py-3 w-full absolute top-10 left-0">
              <ul className="flex flex-col gap-1">
                {options.map((option, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-white px-2 py-1 hover:bg-[#1C2545] cursor-pointer"
                    onClick={() => {
                      setDropdown(option);
                      setOpen(!open);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {filteredData && (
        <div className="grid grid-cols-4 gap-4 pt-12">
          <UserCard
            title="Total Users"
            number={filteredData?.totalUsers}
            icon="/users.png"
          />
          <UserCard
            title="New Users"
            number={filteredData?.newUsers}
            icon="/new-users.png"
          />
          <UserCard
            title="Active Users"
            number={filteredData?.totalDailyActiveUsers}
            icon="/active-users.png"
          />
          <UserCard title="Deleted Users" number={0} icon="/delete-users.png" />
          <UserCard
            title="Average Session"
            number={filteredData?.totalSessions}
            icon="/session.svg"
          />
          <UserCard
            title="Verified Users"
            number={filteredData?.verifiedUsers}
            icon="/verify.svg"
          />
          <UserCard
            title="Exclusive Content"
            number={filteredData?.exclusiveContent}
            icon="/content.svg"
          />
        </div>
      )}

      <div className="flex justify-between pt-10 gap-4">
        <div className="flex-1 w-full rounded-xl shadow-small bg-[#061239] px-4 py-8">
          <div className="text-base text-white font-semibold pb-6">
            Recent 10 Users
          </div>
          <ul className="flex flex-col gap-3">
            {recentUsers.map((user, idx) =>(
              <li key={idx} className="text-base text-white text-sm">{user}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
