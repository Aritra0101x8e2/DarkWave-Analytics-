import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

const getRandomPosition = () => {
  return {
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
  };
};

const getRandomAttackType = () => {
  const attacks = [
    { type: 'Phishing Attempt', severity: 'medium', icon: <AlertTriangle className="w-3 h-3 text-yellow-500" /> },
    { type: 'DDoS Attack', severity: 'high', icon: <AlertTriangle className="w-3 h-3 text-red-500" /> },
    { type: 'Data Breach', severity: 'high', icon: <AlertTriangle className="w-3 h-3 text-red-500" /> },
    { type: 'Malware Detected', severity: 'medium', icon: <AlertTriangle className="w-3 h-3 text-yellow-500" /> },
    { type: 'Suspicious Login', severity: 'low', icon: <AlertTriangle className="w-3 h-3 text-blue-500" /> },
  ];
  
  return attacks[Math.floor(Math.random() * attacks.length)];
};

const getRandomCountry = () => {
  const countries = ['US', 'CN', 'RU', 'IN', 'BR', 'UK', 'DE', 'FR', 'JP', 'CA'];
  return countries[Math.floor(Math.random() * countries.length)];
};

interface Attack {
  id: number;
  position: { x: number; y: number };
  attackInfo: { type: string; severity: string; icon: React.ReactNode };
  country: string;
  timestamp: Date;
}

const LiveFraudMap = () => {
  const [attacks, setAttacks] = useState<Attack[]>([]);
  
  useEffect(() => {
    // Initial attacks
    const initialAttacks = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      position: getRandomPosition(),
      attackInfo: getRandomAttackType(),
      country: getRandomCountry(),
      timestamp: new Date(),
    }));
    
    setAttacks(initialAttacks);
    
    // Add new attacks periodically
    const interval = setInterval(() => {
      setAttacks(prev => {
        const newAttack = {
          id: Date.now(),
          position: getRandomPosition(),
          attackInfo: getRandomAttackType(),
          country: getRandomCountry(),
          timestamp: new Date(),
        };
        
        // Keep only the last 8 attacks
        return [...prev.slice(-7), newAttack];
      });
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="rounded-xl card-glass p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Global Threat Map</h2>
          <p className="text-slate-400 text-sm">Live fraud detection across regions</p>
        </div>
        <div className="flex items-center gap-2 bg-navy-800/60 px-3 py-1.5 rounded-full">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-slate-300">Live monitoring</span>
        </div>
      </div>
      
      <div className="relative w-full h-[240px] bg-navy-900 rounded-lg overflow-hidden border border-navy-800">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {attacks.map((attack) => (
          <div
            key={attack.id}
            className="absolute w-6 h-6 animate-pulse-glow"
            style={{
              left: `${attack.position.x}%`,
              top: `${attack.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative group">
              <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-blue-500" />
              <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-navy-800 border border-blue-500/50">
                {attack.attackInfo.icon}
              </div>
              
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-navy-800 text-xs text-white p-2 rounded shadow-lg whitespace-nowrap">
                  <div className="font-medium">{attack.attackInfo.type}</div>
                  <div className="text-slate-400">Region: {attack.country}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-slate-300">Protected regions</span>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="text-xs text-slate-400 mb-2">Recent Threats</div>
        <div className="space-y-2">
          {attacks.slice(-3).reverse().map((attack) => (
            <div key={`log-${attack.id}`} className="flex items-center gap-3 bg-navy-800/30 rounded-lg p-2">
              <div className="flex-shrink-0">
                {attack.attackInfo.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{attack.attackInfo.type}</p>
                <p className="text-xs text-slate-400">Origin: {attack.country}</p>
              </div>
              <div className="text-xs text-slate-500">
                {attack.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveFraudMap;
