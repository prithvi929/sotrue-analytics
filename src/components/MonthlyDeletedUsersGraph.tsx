import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Tooltip,
  Bar,
  TooltipProps,
  YAxis,
  ReferenceLine,
} from "recharts";

interface UserData {
  itemID: string;
  month: string;
  users: number;
}

const CustomTooltipBar: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const newUsers = payload[0]?.value ?? 0;
    const inactiveUsers = payload[1]?.value ?? 0;
    return (
      <div
        style={{
          backgroundColor: "#DD9A79",
          borderRadius: "4px",
          padding: "4px",
          minWidth: "60px",
          color: "#FCFCFC",
          textAlign: "left",
        }}
      >
        <p className="text-xs">{`New Users ${newUsers}`}</p>
        <p className="text-xs">{`Inactive Users ${Math.abs(inactiveUsers)}`}</p>
      </div>
    );
  }
  return null;
};

const dataDeletedActiveUsers = [
  {
    itemID: "mdu1",
    month: "Jan",
    addUsers: 11616,
    delUsers: -967,
  },

  {
    itemID: "mdu1",
    month: "Feb",
    addUsers: 8476,
    delUsers: -1029,
  },

  {
    itemID: "mdu1",
    month: "Mar",
    addUsers: 34322,
    delUsers: -3266,
  },

  {
    itemID: "mdu1",
    month: "Apr",
    addUsers: 11472,
    delUsers: -1867,
  },

  {
    itemID: "mdu1",
    month: "May",
    addUsers: 17856,
    delUsers: -2351,
  },

  {
    itemID: "mdu1",
    month: "Jun",
    addUsers: 19909,
    delUsers: -2278,
  },

  {
    itemID: "mdu1",
    month: "Jul",
    addUsers: 20029,
    delUsers: -2472,
  },

  {
    itemID: "mdu1",
    month: "Aug",
    addUsers: 14978,
    delUsers: -1594,
  },

  {
    itemID: "mdu1",
    month: "Sep",
    addUsers: 8209,
    delUsers: -1242,
  },

  {
    itemID: "mdu1",
    month: "Oct",
    addUsers: 10289,
    delUsers: -984,
  },
];

const MonthlyDeletedUsersGraph = () => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={dataDeletedActiveUsers}>
          <XAxis dataKey="month" tickLine={false} tick={{ fill: "#666" }} />
          <YAxis />
          <Tooltip
            content={<CustomTooltipBar />}
            cursor={{ fill: "transparent" }}
          />
          <ReferenceLine y={0} stroke="#666" />
          <Bar dataKey="addUsers" opacity={0.3} barSize={24} fill="#DD9A79" />
          <Bar dataKey="delUsers" fill="#F67474" opacity={0.3} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default MonthlyDeletedUsersGraph;
