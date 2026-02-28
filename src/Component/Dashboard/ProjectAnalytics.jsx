import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Analytics=() =>{

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await axios(
        "https://task-api-eight-flax.vercel.app/api/analytics"
      );

      return res.data.map((item) => ({
        ...item,
        day: new Date(item.date).toLocaleDateString("en-US", {
          weekday: "short",
        }),
      }));
    },
  });

  if (isLoading)
    return (
      <div className="bg-white rounded-2xl p-6 h-[400px] animate-pulse bg-gray-200" />
    );

  if (isError)
    return (
      <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl">
        Failed to load analytics data.
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-[400px]">
      <h2 className="text-2xl font-semibold mb-4">
        Project Analytics
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <defs>
            <pattern
              id="stripe"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
            >
              <rect width="6" height="6" fill="#d1d5db" />
              <path
                d="M-1,1 l2,-2
                   M0,6 l6,-6
                   M5,7 l2,-2"
                stroke="#9ca3af"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* 👇 Bar নিচে Day */}
          <XAxis dataKey="day" />

          {/* 👇 Tooltip এ Full Date */}
          <Tooltip
            labelFormatter={(label, payload) => {
              if (payload && payload.length) {
                return payload[0].payload.date;
              }
              return label;
            }}
          />

          <Bar
            dataKey="views"
            fill="#144e33"
            radius={[12, 12, 0, 0]}
          />

          <Bar
            dataKey="clicks"
            fill="#22744f"
            radius={[12, 12, 0, 0]}
          />

          <Bar
            dataKey="conversions"
            fill="url(#stripe)"
            radius={[12, 12, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Analytics