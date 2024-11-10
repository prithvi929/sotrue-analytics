"use client";
import Spinner from "@/components/Spinner";
import { fetchCustomerData } from "@/firebase/firebaseQueries";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

interface CustomerProps {
  itemID: string;
  date: string;
  Verified: boolean;
  country: string;
  platform: string;
  userId: string;
}

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isChangingPage, setIsChangingPage] = useState(false);
  const usersPerPage = 10;

  const {
    data: customerData,
    error: customerError,
    isLoading: isLoadingCustomer,
  } = useQuery<CustomerProps[]>({
    queryKey: ["customerData"],
    queryFn: fetchCustomerData,
  });

  if (isLoadingCustomer)
    return (
      <div className="h-full min-h-screen w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  if (customerError)
    return (
      <div className="h-full min-h-screen w-full flex justify-center items-center">
        <p className="text-base text-white">Error loading data</p>
      </div>
    );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = customerData?.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = async () => {
    if (currentPage < Math.ceil(customerData?.length ?? 0 / usersPerPage)) {
      setIsChangingPage(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      setCurrentPage((prev) => prev + 1);
      setIsChangingPage(false);
    }
  };

  const prevPage = async () => {
    if (currentPage > 1) {
      setIsChangingPage(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); //  second delay
      setCurrentPage((prev) => prev - 1);
      setIsChangingPage(false);
    }
  };

  return (
    <div className="px-6 py-10">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-white text-[40px] leading-[52px] font-bold tracking-normal pb-2">
            Users Dashboard
          </div>
        </div>
      </div>
      <div className="mt-6 w-full px-1 py-2 rounded-xl">
        {isChangingPage ? (
          <div className="h-[400px] w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full text-left rtl:text-right border-separate border-spacing-y-2 ">
              <thead className="text-[#E6A286] text-base font-semibold">
                <tr>
                  <th scope="col" className="px-2 py-1.5">
                    Distinct ID
                  </th>
                  <th scope="col" className="px-2 py-1.5">
                    Verified
                  </th>
                  <th scope="col" className="px-2 py-1.5">
                    Country
                  </th>
                  <th scope="col" className="px-2 py-1.5">
                    Platform
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers?.map((user) => (
                  <tr key={user.itemID}>
                    <th
                      scope="row"
                      className="text-[#2780EB] px-4 py-2 font-medium text-sm bg-[#061239] first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg"
                    >
                      {`${user.userId.slice(0, 8)}-${user.userId.slice(
                        8,
                        12
                      )}-${user.userId.slice(12, 20)}...`}
                    </th>
                    <td className="text-white px-4 py-2 font-medium text-sm bg-[#061239] first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg">
                      {user.Verified == true ? "True" : "False"}
                    </td>
                    <td className="text-white px-4 py-2 font-medium text-sm bg-[#061239] first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg">
                      {user.country}
                    </td>
                    <td className="text-white px-4 py-2 font-medium text-sm bg-[#061239] first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg">
                      {user.platform}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-4 pt-4">
        <button
          className="text-sm cursor-pointer text-[#DE9A8A] font-semibold disabled:opacity-50"
          onClick={prevPage}
          disabled={currentPage === 1 || isChangingPage}
        >
          Previous Page
        </button>
        <button
          className="text-sm cursor-pointer text-[#DE9A8A] font-semibold disabled:opacity-50"
          onClick={nextPage}
          disabled={indexOfLastUser >= (customerData?.length ?? 0) || isChangingPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Users;
