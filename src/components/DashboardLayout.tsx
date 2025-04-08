
import React from 'react';
import Header from './Header';
import FraudStatistics from './FraudStatistics';
import LiveFraudMap from './LiveFraudMap';
import FraudChallengeCard from './FraudChallengeCard';
import FraudActivityChart from './FraudActivityChart';
import LiveFraudCounter from './LiveFraudCounter';
import RealTimeActivityLog from './RealTimeActivityLog';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-navy-950">
      <Header />
      
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-heading">Digital Fraud Landscape</h1>
          <p className="text-slate-400 mt-2">Real-time monitoring and insights into evolving cybersecurity threats</p>
        </div>
        
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <FraudChallengeCard
            title="Evolving Fraud Techniques"
            description="Cybercriminals constantly evolve their methods, making traditional security measures insufficient."
            icon="shield"
            accentColor="text-blue-400"
            statistic="+27%"
            statisticLabel="Increase in sophisticated attacks"
          />
          
          <FraudChallengeCard
            title="Growing Financial Losses"
            description="Organizations lose billions annually to digital fraud, with rising costs per breach."
            icon="shieldX"
            accentColor="text-red-400"
            statistic="$4.35M"
            statisticLabel="Average cost per breach"
          />
          
          <FraudChallengeCard
            title="Damaged User Trust"
            description="When security breaches occur, customer trust plummets significantly."
            icon="info"
            accentColor="text-amber-400"
            statistic="60%"
            statisticLabel="Users leave after one incident"
          />
          
          <FraudChallengeCard
            title="Regulatory Compliance Risk"
            description="Failing to protect user data leads to severe penalties under regulations."
            icon="shieldCheck"
            accentColor="text-purple-400"
            statistic="$4-$20M"
            statisticLabel="Potential GDPR penalties"
          />
        </div>
        
        {/* Real-time metrics */}
        <div className="mb-6">
          <LiveFraudCounter />
        </div>
        
        {/* Middle row - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FraudActivityChart />
          <FraudStatistics />
        </div>
        
        {/* Bottom row - Map and Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LiveFraudMap />
          <RealTimeActivityLog />
        </div>
      </main>
      
      <footer className="bg-navy-900/50 border-t border-navy-800 py-4 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} DarkWave : FraudWatch Horizon Shield - Aritra Kundu. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-xs text-slate-500">Protected by industry-leading encryption</p>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-xs text-slate-400">System operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
