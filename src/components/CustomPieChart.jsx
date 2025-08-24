import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomPieChart = ({ data, label, totalAmount, colors }) => {
  return (
    <div className="w-full h-80 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Donut */}
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={3}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-sm text-white">Total Balance</span>
        <span className="text-lg font-semibold text-white">{totalAmount}</span>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></span>
            <span className="text-gray-300">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;
