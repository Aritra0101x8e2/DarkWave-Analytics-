
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Phishing', value: 35, color: '#3b82f6' },
  { name: 'Identity Theft', value: 25, color: '#8b5cf6' },
  { name: 'Payment Fraud', value: 20, color: '#06b6d4' },
  { name: 'Account Takeover', value: 15, color: '#f472b6' },
  { name: 'Other', value: 5, color: '#10b981' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy-800/90 p-3 border border-navy-700 rounded-md backdrop-blur-sm">
        <p className="font-medium text-white">{payload[0].name}</p>
        <p className="text-blue-300">{`${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const FraudStatistics = () => {
  return (
    <div className="rounded-xl card-glass p-4 h-full">
      <h2 className="text-xl font-semibold text-white mb-1">Fraud Distribution</h2>
      <p className="text-slate-400 text-sm mb-4">Types of attacks detected in 2024</p>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center" 
              formatter={(value) => <span className="text-slate-300">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-navy-800/50 p-3 rounded-lg border border-navy-700/30">
          <p className="text-slate-400 text-xs">Financial Impact</p>
          <p className="text-white text-xl font-bold">$4.35M</p>
          <p className="text-xs text-red-400">+12% from 2022</p>
        </div>
        <div className="bg-navy-800/50 p-3 rounded-lg border border-navy-700/30">
          <p className="text-slate-400 text-xs">Avg. Detection Time</p>
          <p className="text-white text-xl font-bold">3.2 hrs</p>
          <p className="text-xs text-green-400">-8% from 2022</p>
        </div>
      </div>
    </div>
  );
};

export default FraudStatistics;
