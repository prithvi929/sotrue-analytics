"use client";
import { generateUserIDs } from "@/utils/userId";
import React, { useState } from "react";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const users = generateUserIDs();

  // Calculate the indexes of the users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
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
      </div>
      <div className="mt-10 w-full rounded-xl shadow-small bg-[#061239] px-4 py-8">
        <div className="text-base text-white font-semibold pb-6">
          Recent Users
        </div>
        <ul className="flex flex-col gap-3">
          {currentUsers.map((user, idx) => (
            <li key={idx} className="text-base text-white text-sm">
              {user}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between px-4 pt-6">
        <button
          className="text-xs cursor-pointer text-white font-bold disabled:opacity-50"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className="text-xs cursor-pointer text-white font-bold disabled:opacity-50"
          onClick={nextPage}
          disabled={indexOfLastUser >= users.length}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Users;
