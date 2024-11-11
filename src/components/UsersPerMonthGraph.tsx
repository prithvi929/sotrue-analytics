import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

interface UserData {
  itemID: string;
  month: string;
  users: number;
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
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
        <p style={{ marginBottom: "2px", fontSize: "12px", opacity: "0.8" }}>
          {label}
        </p>
        <p>{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const data = [
  {
    itemID: "nupm1",
    month: "Jan",
    users: 35056,
  },
  { itemID: "nupm2", month: "Feb", users: 42293 },
  { itemID: "nupm3", month: "Mar", users: 70072 },
  { itemID: "nupm4", month: "Apr", users: 80401 },
  { itemID: "nupm5", month: "May", users: 96361 },
  { itemID: "nupm6", month: "Jun", users: 111638 },
  { itemID: "nupm7", month: "Jul", users: 128121 },
  { itemID: "nupm8", month: "Aug", users: 140440 },
  { itemID: "nupm9", month: "Sep", users: 146273 },
  { itemID: "nupm11", month: "Oct", users: 154575 },
];

const UsersPerMonthGraph = () => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 0, left: -24, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#FCFCFC" opacity={0.1} />
          <XAxis dataKey="month" tickLine={false} />
          <YAxis
            tickFormatter={(value) => `${value / 1000}K`}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default UsersPerMonthGraph;
