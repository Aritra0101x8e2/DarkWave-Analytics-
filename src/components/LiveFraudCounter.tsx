
import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

interface CounterProps {
  title: string;
  icon: React.ReactNode;
  baseValue: number;
  incrementMin: number;
  incrementMax: number;
  color: string;
  interval?: number;
}

const CounterCard: React.FC<CounterProps> = ({
  title,
  icon,
  baseValue,
  incrementMin,
  incrementMax,
  color,
  interval = 5000,
}) => {
  const [count, setCount] = useState(baseValue);
  const [isIncrementing, setIsIncrementing] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      const increment = Math.floor(Math.random() * (incrementMax - incrementMin + 1)) + incrementMin;
      setCount(prevCount => prevCount + increment);
      
      // Animate the counter
      setIsIncrementing(true);
      setTimeout(() => setIsIncrementing(false), 500);
    }, interval);
    
    return () => clearInterval(timer);
  }, [incrementMin, incrementMax, interval]);
  
  return (
    <div className="bg-navy-800/50 rounded-xl p-4 border border-navy-700/30">
      <div className="flex items-center gap-3 mb-3">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${color}`}>
          {icon}
        </div>
        <h3 className="text-white font-medium">{title}</h3>
      </div>
      
      <div className="relative h-10 overflow-hidden">
        <span 
          className={`text-2xl font-bold text-white absolute inset-0 flex items-center ${
            isIncrementing ? 'animate-countup' : ''
          }`}
        >
          {count.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const LiveFraudCounter = () => {
  return (
    <div className="rounded-xl card-glass p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Live Fraud Metrics</h2>
          <p className="text-slate-400 text-sm">Real-time counter of global activity</p>
        </div>
        <div className="flex items-center gap-2 bg-navy-800/60 px-3 py-1.5 rounded-full">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-slate-300">Live data</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CounterCard
          title="Attacks Detected"
          icon={<Shield className="w-4 h-4 text-white" />}
          baseValue={13457}
          incrementMin={1}
          incrementMax={5}
          color="bg-red-500/20"
          interval={3000}
        />
        
        <CounterCard
          title="Attacks Prevented"
          icon={<Shield className="w-4 h-4 text-white" />}
          baseValue={12891}
          incrementMin={1}
          incrementMax={4}
          color="bg-blue-500/20"
          interval={4000}
        />
        
        <CounterCard
          title="Total Financial Loss"
          icon={<Shield className="w-4 h-4 text-white" />}
          baseValue={4350000}
          incrementMin={500}
          incrementMax={3000}
          color="bg-amber-500/20"
          interval={7000}
        />
        
        <CounterCard
          title="Users Protected"
          icon={<Shield className="w-4 h-4 text-white" />}
          baseValue={583942}
          incrementMin={5}
          incrementMax={20}
          color="bg-green-500/20"
          interval={5000}
        />
      </div>
    </div>
  );
};

export default LiveFraudCounter;
