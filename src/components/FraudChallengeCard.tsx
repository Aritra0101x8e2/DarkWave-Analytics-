
import React from 'react';
import { Shield, ShieldCheck, ShieldX, Info } from 'lucide-react';

type CardProps = {
  title: string;
  description: string;
  icon: 'shield' | 'shieldCheck' | 'shieldX' | 'info';
  accentColor: string;
  statistic?: string;
  statisticLabel?: string;
};

const FraudChallengeCard: React.FC<CardProps> = ({
  title,
  description,
  icon,
  accentColor,
  statistic,
  statisticLabel,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'shield':
        return <Shield className={`w-5 h-5 ${accentColor}`} />;
      case 'shieldCheck':
        return <ShieldCheck className={`w-5 h-5 ${accentColor}`} />;
      case 'shieldX':
        return <ShieldX className={`w-5 h-5 ${accentColor}`} />;
      case 'info':
        return <Info className={`w-5 h-5 ${accentColor}`} />;
      default:
        return <Shield className={`w-5 h-5 ${accentColor}`} />;
    }
  };

  return (
    <div className="rounded-xl card-glass p-5 animate-fade-in h-full flex flex-col">
      <div className="flex items-start gap-4">
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-navy-800`}>
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-slate-400 text-sm mt-1">{description}</p>
        </div>
      </div>
      
      {statistic && statisticLabel && (
        <div className="mt-4 pt-4 border-t border-navy-800">
          <p className="text-sm text-slate-400">{statisticLabel}</p>
          <p className={`text-2xl font-bold ${accentColor}`}>{statistic}</p>
        </div>
      )}
    </div>
  );
};

export default FraudChallengeCard;
