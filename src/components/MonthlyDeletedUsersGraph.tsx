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
    return (
      <div
        style={{
          backgroundColor: "#DD9A79",
          borderRadius: "4px",
          padding: "4px",
          minWidth: "60px",
          color: "#FCFCFC",
          textAlign: "center",
        }}
      >
        <p>{`${payload[0].value}`}</p>
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
    delUsers: -954,
  },

  {
    itemID: "mdu1",
    month: "Feb",
    addUsers: 8476,
    delUsers: -693,
  },

  {
    itemID: "mdu1",
    month: "Mar",
    addUsers: 34322,
    delUsers: -3443,
  },

  {
    itemID: "mdu1",
    month: "Apr",
    addUsers: 11472,
    delUsers: -1143,
  },

  {
    itemID: "mdu1",
    month: "May",
    addUsers: 17856,
    delUsers: -1699,
  },

  {
    itemID: "mdu1",
    month: "Jun",
    addUsers: 19909,
    delUsers: -5455,
  },

  {
    itemID: "mdu1",
    month: "Jul",
    addUsers: 20029,
    delUsers: -5567,
  },

  {
    itemID: "mdu1",
    month: "Aug",
    addUsers: 14978,
    delUsers: -3969,
  },

  {
    itemID: "mdu1",
    month: "Sep",
    addUsers: 8209,
    delUsers: -7047,
  },

  {
    itemID: "mdu1",
    month: "Oct",
    addUsers: 10289,
    delUsers: -5124,
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
