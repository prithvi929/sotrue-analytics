"use client";
import Spinner from "@/components/Spinner";
import { fetchCustomerData } from "@/firebase/firebaseQueries";
import React, { useState, useEffect } from "react";
import { DocumentData } from "firebase/firestore";

interface CustomerProps {
  itemID: string;
  date: string;
  Verified: boolean;
  country: string;
  platform: string;
  userId: string;
}

const Users = () => {
  const [users, setUsers] = useState<CustomerProps[]>([]);
  const [isChangingPage, setIsChangingPage] = useState(true); // Initially true to show spinner on first load
  const [lastVisibleStack, setLastVisibleStack] = useState<DocumentData[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page number
  const usersPerPage = 20;

  const fetchUsers = async (startAfterDoc: DocumentData | null = null) => {
    setIsChangingPage(true); // Show spinner before data load
    const { data, lastVisibleDoc } = await fetchCustomerData(usersPerPage, startAfterDoc);
    setUsers(data);
    setIsChangingPage(false); // Hide spinner after data load

    if (lastVisibleDoc && (startAfterDoc !== lastVisibleDoc || currentPage === 1)) {
      setLastVisibleStack((prev) => [...prev, lastVisibleDoc]);
    }
  };

  useEffect(() => {
    fetchUsers(); // Initial load for the first page
  }, []);

  const nextPage = async () => {
    if (lastVisibleStack.length > 0) {
      const lastVisible = lastVisibleStack[lastVisibleStack.length - 1];
      await fetchUsers(lastVisible);
      setCurrentPage((prev) => prev + 1); // Increment page count
    }
  };

  const prevPage = async () => {
    if (currentPage > 1) {
      const updatedStack = [...lastVisibleStack];
      updatedStack.pop(); // Remove the last document from the stack

      const previousPageLastVisible = updatedStack[updatedStack.length - 1];
      setLastVisibleStack(updatedStack);
      await fetchUsers(previousPageLastVisible);
      setCurrentPage((prev) => prev - 1); // Decrement page count
    }
  };

  if (isChangingPage)
    return (
      <div className="h-full min-h-screen w-full flex justify-center items-center">
        <Spinner />
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
      </div>
      <div className="mt-6 w-full px-1 py-2 rounded-xl">
        <div className="relative overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-separate border-spacing-y-2 ">
            <thead className="text-[#E6A286] text-base font-semibold">
              <tr>
                <th scope="col" className="px-2 py-1.5">Distinct ID</th>
                <th scope="col" className="px-2 py-1.5">Verified</th>
                <th scope="col" className="px-2 py-1.5">Country</th>
                <th scope="col" className="px-2 py-1.5">Platform</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.itemID}>
                  <th scope="row" className="text-[#2780EB] px-4 py-2 font-medium text-sm bg-[#061239] first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg">
                    {`${user.userId.slice(0, 8)}-${user.userId.slice(8, 12)}-${user.userId.slice(12, 20)}...`}
                  </th>
                  <td className="text-white px-4 py-2 font-medium text-sm bg-[#061239] first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg">
                    {user.Verified ? "True" : "False"}
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
      </div>
      <div className="flex items-center justify-between px-4 pt-4">
        <button
          className="text-sm cursor-pointer text-[#DE9A8A] font-semibold disabled:opacity-50"
          onClick={prevPage}
          disabled={currentPage === 1 || isChangingPage} // Disable when on the first page
        >
          Previous Page
        </button>
        <button
          className="text-sm cursor-pointer text-[#DE9A8A] font-semibold disabled:opacity-50"
          onClick={nextPage}
          disabled={isChangingPage || lastVisibleStack.length === 0}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Users;