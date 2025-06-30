import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useThemeStore from "../../store/useThemeStore";

export default function PriceChart({
  data,
}: {
  data: { date: string; rate: number }[];
}) {
  const { theme } = useThemeStore();
  return (
    <div className="dark:bg-slate-700 bg-gray-200 p-4 rounded-md mb-5">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tick={{
              fill: theme === "dark" ? "#cbd5e1" : "#1e293b",
              fontSize: 12,
            }}
            axisLine={{ stroke: "#475569" }}
            tickLine={false}
          />
          <YAxis
            domain={["dataMin", "dataMax"]}
            tickFormatter={(value) =>
              `$${Number(value).toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}`
            }
            tick={{
              fill: theme === "dark" ? "#cbd5e1" : "#1e293b",
              fontSize: 12,
            }}
            axisLine={{ stroke: "#475569" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor:
                theme === "dark" ? "#1e293b" : "rgb(128, 136, 145)",
              borderColor: "#334155",
              color: "#fff",
            }}
            labelStyle={{ color: "#cbd5e1" }}
            formatter={(value: number) => [
              `$${value.toLocaleString()}`,
              "Price",
            ]}
            labelFormatter={(label) => `At: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
