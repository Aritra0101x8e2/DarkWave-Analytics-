
import React from 'react';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-6 bg-navy-900/80 backdrop-blur-md border-b border-navy-700/50">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">DarkWave : FraudWatch Horizon Shield</h1>
          <p className="text-xs text-slate-400">Advanced Fraud Detection & Monitoring</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <p className="text-xs text-slate-400">Live monitoring active</p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse-glow"></span>
            <span className="text-sm text-slate-300">System operational</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
