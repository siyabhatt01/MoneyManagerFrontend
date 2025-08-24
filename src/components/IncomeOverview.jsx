import React, { useEffect, useState } from 'react'
import { prepareIncomeLineChartData } from '../util/prepareIncomeLineChartData';
// Recharts imports
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area
} from "recharts";
import CustomChart from './CustomChart';
import { Plus } from 'lucide-react';

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);
        return () => { };
    }, [transactions]);

    return (
        <div className='bg-gray-900 shadow-2xl rounded-3xl p-6 border border-gray-800 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300'>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h5 className="text-xl font-bold text-gray-100">
                        Income Overview
                    </h5>
                    <p className="text-sm text-gray-400 mt-1 font-medium">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
                <button className='cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 hover:shadow-xl active:from-green-700 active:to-green-800 transition-all duration-200 transform hover:-translate-y-0.5'
                    onClick={onAddIncome}
                >
                    <Plus size={16} className='text-lg' />
                    Add Income
                </button>

            </div>
            <div className="w-full h-64 mb-6">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <defs>
                            {/* Gradient fill under line */}
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(date) => new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                            stroke="#9CA3AF"
                        />
                        <YAxis tickFormatter={(val) => `₹${val}`} stroke="#9CA3AF" />

                        {/* Custom Tooltip */}
                        <Tooltip content={<CustomChart />} />

                        {/* Smooth line */}
                        <Line
                            type="monotone"
                            dataKey="totalAmount"
                            stroke="#7C3AED"
                            strokeWidth={3}
                            dot={{ r: 4, stroke: "#7C3AED", fill: "#1F2937", strokeWidth: 2 }}
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