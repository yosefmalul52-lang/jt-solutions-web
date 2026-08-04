"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartPoint } from "@/lib/admin/types";

export function LeadsChart({ data }: { data: ChartPoint[] }) {
  return (
    <div className="h-full w-full" dir="rtl">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 4, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="leadsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e2e8f0" strokeOpacity={0.9} vertical={false} />
          <XAxis
            dataKey="day"
            reversed
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#475569", fontSize: 12 }}
          />
          <YAxis
            orientation="right"
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            width={28}
            tick={{ fill: "#475569", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #e2e8f0",
              boxShadow: "none",
              fontSize: 13,
              direction: "rtl",
              textAlign: "right",
            }}
            labelStyle={{ color: "#0f172a", fontWeight: 600 }}
            formatter={(value) => [`${String(value)} לידים`, "סה״כ"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2.5}
            fill="url(#leadsFill)"
            activeDot={{ r: 4, fill: "#1e3a8a", strokeWidth: 0 }}
            dot={(props) => {
              const { cx, cy, index } = props;
              if (index !== data.length - 1 || cx == null || cy == null) {
                return null;
              }
              return (
                <circle
                  key={`end-dot-${index}`}
                  cx={cx}
                  cy={cy}
                  r={3.5}
                  fill="#1e3a8a"
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              );
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
