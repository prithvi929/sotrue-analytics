"use client";
import MonthlyActiveUsersGraph from "@/components/MonthlyActiveUsersGraph";
import MonthlyDeletedUsersGraph from "@/components/MonthlyDeletedUsersGraph";
import Spinner from "@/components/Spinner";
import UsersPerMonthGraph from "@/components/UsersPerMonthGraph";
import {
  fetchMonthlyActiveUsersData,
  fetchMonthlyDeletedUsersData,
  fetchNewUserPerMonthData,
} from "@/firebase/firebaseQueries";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface UserData {
  itemID: string;
  month: string;
  users: number;
}

const Analytics = () => {
  const {
    data: newUserPerMonthData,
    error: newUserError,
    isLoading: isLoadingNewUser,
  } = useQuery<UserData[]>({
    queryKey: ["newUserPerMonthData"],
    queryFn: fetchNewUserPerMonthData,
  });

  const {
    data: monthlyDeletedUsersData,
    error: deletedUserError,
    isLoading: isLoadingDeletedUser,
  } = useQuery<UserData[]>({
    queryKey: ["monthlyDeletedUsersData"],
    queryFn: fetchMonthlyDeletedUsersData,
  });

  const {
    data: monthlyActiveUsersData,
    error: activeUserError,
    isLoading: isLoadingActiveUser,
  } = useQuery<UserData[]>({
    queryKey: ["monthlyActiveUsersData"],
    queryFn: fetchMonthlyActiveUsersData,
  });

  if (isLoadingNewUser || isLoadingDeletedUser || isLoadingActiveUser) {
    return (
      <div className="h-full min-h-screen w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (newUserError || deletedUserError || activeUserError) {
    return (
      <div className="h-full min-h-screen w-full flex justify-center items-center">
        <p className="text-base text-white">{`Error loading data: ${newUserError || deletedUserError || activeUserError}`}</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="text-white text-[40px] leading-[52px] font-bold tracking-normal pb-2">
        Analytics
      </div>
      <div className="grid grid-cols-2 gap-8 pt-12">
        <div className="bg-[#071237] w-full rounded-2xl h-96">
          <div className="px-8 py-6 h-full w-full flex flex-col">
            <div className="text-[#FCFCFC] text-base">Total Users</div>
            <div className="h-full w-full pt-6 grow">
              <UsersPerMonthGraph data={newUserPerMonthData ?? []} />
            </div>
          </div>
        </div>
        <div className="bg-[#071237] w-full rounded-2xl h-96">
          <div className="px-8 py-6 h-full w-full flex flex-col">
            <div className="text-[#FCFCFC] text-base">Monthly Active Users</div>
            <div className="h-full w-full pt-6 grow">
              <MonthlyActiveUsersGraph data={monthlyActiveUsersData ?? []} />
            </div>
          </div>
        </div>
        <div className="bg-[#071237] w-full rounded-2xl h-96">
          <div className="px-8 py-6 h-full w-full flex flex-col">
            <div className="text-[#FCFCFC] text-base">
              New Users vs Inactive Users
            </div>
            <div className="h-full w-full pt-6 grow">
              <MonthlyDeletedUsersGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
