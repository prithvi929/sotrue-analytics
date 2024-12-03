"use client";
import Spinner from "@/components/Spinner";
import UserCard from "@/components/UserCard";
import {
  fetchDailyAnalyticsData,
  fetchMonthlyAnalyticsData,
} from "@/firebase/firebaseQueries";
import { getCurrentDate } from "@/utils/date"; // Imported utility function
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AnalyticsProps {
  id: string;
  month: string;
  totalUsers?: number;
  newUsers?: number;
  totalDailyActiveUsers?: number;
  deleteUsers?: number;
  totalSessions?: number;
  verifiedUsers?: number;
  exclusiveContent?: number;
}

export default function Overview() {
  const options = [
    "Yesterday",
    "November",
    "October",
    "September",
    "August",
    "July",
    "June",
    "May",
    "April",
    "March",
    "February",
    "January",
  ];
  const [dropdown, setDropdown] = useState(options[0]);
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<AnalyticsProps | null>(null);

  const {
    data: monthlyData,
    error: monthlyError,
    isLoading: isLoadingMonthly,
  } = useQuery<AnalyticsProps[]>({
    queryKey: ["monthlyAnalyticsData"],
    queryFn: fetchMonthlyAnalyticsData,
  });

  const {
    data: dailyData,
    error: dailyError,
    isLoading: isLoadingDaily,
  } = useQuery<AnalyticsProps[]>({
    queryKey: ["dailyAnalyticsData"],
    queryFn: fetchDailyAnalyticsData,
  });

  // Filter data based on dropdown selection
  useEffect(() => {
    if (dropdown !== "Yesterday") {
      const data = monthlyData?.find(
        (item) => item.month.toLowerCase() === dropdown.toLowerCase()
      );
      setFilteredData(data || null);
    } else {
      const date = getCurrentDate();
      const data = dailyData?.find((item) => item.month.toLowerCase() === date);
      setFilteredData(data || null);
    }
  }, [dropdown, monthlyData, dailyData]);

  if (isLoadingMonthly || isLoadingDaily)
    return (
      <div className="h-full min-h-screen w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  if (monthlyError || dailyError)
    return (
      <div className="h-full min-h-screen w-full flex justify-center items-center">
        <p className="text-base text-white">Error loading data</p>
      </div>
    );

  return (
    <div className="px-6 py-10">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-white text-[40px] leading-[52px] font-bold tracking-normal pb-2">
            Users Dashboard
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
          {dropdown !== "Yesterday" && (
            <UserCard
              title="Total Users"
              number={filteredData?.totalUsers}
              icon="/users.png"
            />
          )}
          <UserCard
            title="New Users"
            number={filteredData?.newUsers}
            icon="/new-users.png"
          />
          {dropdown === "Yesterday" && (
            <UserCard
              title="Deleted Users"
              number={filteredData?.deleteUsers}
              icon="/active-users.png"
            />
          )}
          {dropdown !== "Yesterday" && (
            <>
              <UserCard
                title="Monthly Active Users"
                number={filteredData?.totalDailyActiveUsers}
                icon="/active-users.png"
              />
              <UserCard
                title="Deleted Users"
                number={filteredData?.deleteUsers}
                icon="/active-users.png"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
