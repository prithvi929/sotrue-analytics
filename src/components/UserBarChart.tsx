"use client";
import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type DataPoint = {
  month: string,
  totalUsers: number,
  totalDailyActiveUsers: number,
  totalSessions: number,
  verifiedUsers: number,
  exclusiveContent: number,
};

type UserBarChartPropsType = {
  data: DataPoint[];
};

const UserBarChart = ({ data }: UserBarChartPropsType) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={data}>
          <Legend verticalAlign="top" align="right" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#FFFFFF" }}
            tickLine={false}
            axisLine={{ stroke: "#FFFFFF99" }}
            style={{ fontSize: "10px" }}
          />
          <YAxis
            tick={{ fill: "#FFFFFF99" }}
            tickLine={false}
            axisLine={{ stroke: "#FFFFFF99" }}
            style={{ fontSize: "10px" }}
          />
          <Bar
            dataKey="totalUsers"
            fill="#D78973"
            barSize={16}
            radius={[4, 4, 0, 0]}
            name="Total User"
          />
          <Bar
            dataKey="verifiedUsers"
            fill="#EEE5FF"
            barSize={16}
            radius={[4, 4, 0, 0]}
            name="Verified Users"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default UserBarChart;
