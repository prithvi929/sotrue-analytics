import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Tooltip,
  Bar,
  TooltipProps,
} from "recharts";

interface UserData {
  itemID: string;
  month: string;
  users: number;
}

type CustomBarProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  opacity?: number;
};

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

const CustomBar: React.FC<CustomBarProps> = ({
  x,
  y,
  width,
  height,
  fill,
  opacity,
}) => {
  const [hover, setHover] = React.useState(false);

  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        opacity={hover ? 1 : opacity}
        rx={4} // This rounds both top and bottom corners
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    </>
  );
};

const data = [
  {
    itemID: "mau1",
    month: "Jan",
    users: 8823,
  },
  { itemID: "mau2", month: "Feb", users: 12243 },
  { itemID: "mau3", month: "Mar", users: 25443 },
  { itemID: "mau4", month: "Apr", users: 28127 },
  { itemID: "mau5", month: "May", users: 27651 },
  { itemID: "mau6", month: "Jun", users: 34769 },
  { itemID: "mau7", month: "Jul", users: 38217 },
  { itemID: "mau8", month: "Aug", users: 41299 },
  { itemID: "mau9", month: "Sep", users: 43334 },
  { itemID: "mau11", month: "Oct", users: 53786 },
];

const MonthlyActiveUsersGraph = () => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666" }}
          />
          <Tooltip
            content={<CustomTooltipBar />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="users"
            fill="#DD9A79"
            opacity={0.3}
            shape={<CustomBar />}
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default MonthlyActiveUsersGraph;
