import React, { useEffect, useState } from 'react'
import { prepareIncomeLineChartData } from '../util/prepareIncomeLineChartData';
// Recharts imports
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area
} from "recharts";
import CustomChart from './CustomChart';
import { Plus } from 'lucide-react';

const IncomeOverview = ({transactions,onAddIncome}) => {
    const [chartData,setChartData]=useState([]);

    useEffect(()=>{
        const result=prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);
        return ()=>{};
    },[transactions]);

  return (
    <div className='bg-white shadow-md rounded-xl p-4 border p-4 mt-5 '>
        <div className="flex items-center justify-between">
            <div>
                <h5 className="text-lg">
                    Income Overview
                </h5>
                <p className="text-xs text-gray-400 mt-0">
                    Track your earnings over time and analyze your income trends.
                </p>
            </div>
            <button className='cursor-pointer inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-green-600    bg-green-100 rounded-lg shadow-sm hover:bg-green-200 hover:text-green-900 active:bg-purple-300 transition-colors'
                onClick={onAddIncome}
              >
                <Plus size={15} className='text-lg'/>
                Add Income
            </button>
             
        </div>
        <div className="mt-6 w-full h-64 mb-10">
          <ResponsiveContainer width="100%" height={300}>
  <LineChart data={chartData}>
    <defs>
      {/* Gradient fill under line */}
      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.4} />
        <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.05} />
      </linearGradient>
    </defs>

    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis 
      dataKey="date" 
      tickFormatter={(date) => new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} 
    />
    <YAxis tickFormatter={(val) => `₹${val}`} />

    {/* Custom Tooltip */}
    <Tooltip content={<CustomChart />} />

    {/* Smooth line */}
    <Line 
      type="monotone" 
      dataKey="totalAmount" 
      stroke="#7C3AED" 
      strokeWidth={3} 
      dot={{ r: 4, stroke: "#7C3AED", fill: "#fff", strokeWidth: 2 }} 
      activeDot={{ r: 6 }} 
    />

    {/* Shaded area under line */}
    <Area type="monotone" dataKey="totalAmount" stroke="none" fill="url(#colorIncome)" />
  </LineChart>
</ResponsiveContainer>
        </div>
    </div>
  )
}

export default IncomeOverview