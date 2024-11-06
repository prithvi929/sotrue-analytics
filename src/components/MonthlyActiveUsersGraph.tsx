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

const MonthlyActiveUsersGraph: React.FC<{ data: UserData[] }> = ({ data }) => {
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
