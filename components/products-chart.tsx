"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChartContainer, type ChartConfig } from "./ui/chart";

interface ChartData {
  week: string;
  products: number;
}

export default function ProductsChart({ data }: { data: ChartData[] }) {
  console.log(data);
  const chartConfig = {
    products: {
      label: "Products",
      color: "#2563eb",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig} className="min-h-10 h-48 w-full">
      <AreaChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--muted)" />
        <XAxis
          dataKey="week"
          stroke="var(--muted-foreground)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="var(--muted-foreground)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Area
          type="monotone"
          dataKey="products"
          stroke="var(--chart-1)"
          fill="var(--chart-5)"
          fillOpacity={0.2}
          strokeWidth={2}
          dot={{ fill: "var(--chart-1)", r: 2 }}
          activeDot={{ fill: "var(--chart-1)", r: 4 }}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "var(--accent)",
            border: "1px solid var(--accent-foreground)",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
          }}
          labelStyle={{
            color: "var(--accent-foreground)",
            fontWeight: "500",
          }}
        />
      </AreaChart>
    </ChartContainer>
  );
}
