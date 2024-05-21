import Image from "next/image";
import React from "react";

type UserCardPropsType = {
  title: string;
  number: number | string;
  icon: string;
};

const UserCard = ({ title, number, icon }: UserCardPropsType) => {
  const formatter = new Intl.NumberFormat('hi-IN');
  const formattedNumber = formatter.format(number as number);
  return (
    <div className="px-6 pt-4 pb-8 bg-[#061239] w-full gap-4 rounded-xl shadow-small ">
      <Image src={icon} alt={`${title} icon`} width={36} height={36} style={{ width: "auto", height: "auto" }} />
      <div className="text-white text-2xl font-bold pb-2 pt-4">{title === "Average Session" ? `${number}` : formattedNumber}</div>
      <div className="text-[#ffffff99] text-xs font-medium">{title}</div>
    </div>
  );
};

export default UserCard;
