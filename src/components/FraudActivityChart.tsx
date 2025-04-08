
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const data = [
  { month: 'Jan', attacks: 45, prevented: 42 },
  { month: 'Feb', attacks: 52, prevented: 48 },
  { month: 'Mar', attacks: 48, prevented: 45 },
  { month: 'Apr', attacks: 70, prevented: 65 },
  { month: 'May', attacks: 95, prevented: 88 },
  { month: 'Jun', attacks: 78, prevented: 74 },
  { month: 'Jul', attacks: 92, prevented: 87 },
  { month: 'Aug', attacks: 110, prevented: 103 },
  { month: 'Sep', attacks: 125, prevented: 117 },
  { month: 'Oct', attacks: 148, prevented: 139 },
  { month: 'Nov', attacks: 130, prevented: 122 },
  { month: 'Dec', attacks: 158, prevented: 149 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy-800/90 p-3 border border-navy-700 rounded-md backdrop-blur-sm">
        <p className="font-medium text-white mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-300">{entry.name}:</span>
            <span className="text-blue-300 font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const FraudActivityChart = () => {
  // Calculate trends
  const previousMonthAttacks = data[data.length - 2].attacks;
  const currentMonthAttacks = data[data.length - 1].attacks;
  const attackTrend = ((currentMonthAttacks - previousMonthAttacks) / previousMonthAttacks) * 100;
  
  const previousMonthPrevented = data[data.length - 2].prevented;
  const currentMonthPrevented = data[data.length - 1].prevented;
  const preventionTrend = ((currentMonthPrevented - previousMonthPrevented) / previousMonthPrevented) * 100;
  
  return (
    <div className="rounded-xl card-glass p-4 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Fraud Activity Trends</h2>
          <p className="text-slate-400 text-sm">Monthly attack patterns and prevention</p>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-white">{attackTrend.toFixed(1)}%</span>
              {attackTrend > 0 ? (
                <TrendingUp className="w-4 h-4 text-red-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-400" />
              )}
            </div>
            <span className="text-xs text-slate-400">Attack trend</span>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-white">{preventionTrend.toFixed(1)}%</span>
              {preventionTrend > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
            </div>
            <span className="text-xs text-slate-400">Prevention rate</span>
          </div>
        </div>
      </div>
      
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#94a3b8' }} 
              axisLine={{ stroke: '#334155' }}
              tickLine={{ stroke: '#334155' }}
            />
            <YAxis 
              tick={{ fill: '#94a3b8' }} 
              axisLine={{ stroke: '#334155' }}
              tickLine={{ stroke: '#334155' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value) => <span className="text-slate-300">{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="attacks"
              stroke="#ef4444"
              strokeWidth={2}
              activeDot={{ r: 8, fill: '#ef4444', stroke: '#0f172a', strokeWidth: 2 }}
              dot={{ r: 0 }}
              name="Attacks"
            />
            <Line
              type="monotone"
              dataKey="prevented"
              stroke="#3b82f6"
              strokeWidth={2}
              activeDot={{ r: 8, fill: '#3b82f6', stroke: '#0f172a', strokeWidth: 2 }}
              dot={{ r: 0 }}
              name="Prevented"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FraudActivityChart;
