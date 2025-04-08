import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldCheck, Info } from 'lucide-react';

interface LogEntry {
  id: number;
  type: 'attack' | 'prevention' | 'info';
  message: string;
  timestamp: Date;
  severity?: 'high' | 'medium' | 'low';
}

// Attack messages
const attackMessages = [
  "Suspicious login attempt detected from {location}",
  "Brute force attack detected on user account",
  "Multiple failed authentication attempts",
  "Unusual transaction pattern detected: ${amount}",
  "Potential data exfiltration detected",
  "Phishing attempt blocked from {domain}",
  "Malware signature detected in upload",
  "Cross-site scripting attempt blocked",
  "SQL injection attempt detected",
  "Unusual API request pattern detected"
];

// Prevention messages
const preventionMessages = [
  "Account access blocked due to suspicious activity",
  "Transaction halted for security verification",
  "IP address {ip} added to block list",
  "User alerted about suspicious login attempt",
  "Multi-factor authentication challenge triggered",
  "Automatic lockdown initiated for user {user}",
  "Suspicious file quarantined",
  "Fraudulent transaction prevented: ${amount}",
  "Behavioral analysis flagged and prevented attack",
  "Security patch automatically applied"
];

// Info messages
const infoMessages = [
  "Security scan completed successfully",
  "System updated to latest security definitions",
  "User completed security awareness training",
  "New security policy deployed",
  "Threat intelligence feed updated",
  "Compliance check completed",
  "Backup verification completed",
  "Security token refreshed",
  "User permissions audit completed",
  "New device authenticated for user {user}"
];

const getRandomLocation = () => {
  const locations = ["New York", "Beijing", "Moscow", "London", "Tokyo", "Sydney", "Berlin", "Rio de Janeiro", "Mumbai", "Toronto"];
  return locations[Math.floor(Math.random() * locations.length)];
};

const getRandomIP = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

const getRandomDomain = () => {
  const domains = ["malicious-site.com", "fake-login.net", "scam-portal.org", "data-theft.co", "malware-download.info"];
  return domains[Math.floor(Math.random() * domains.length)];
};

const getRandomUser = () => {
  return `user${Math.floor(Math.random() * 10000)}`;
};

const getRandomAmount = () => {
  return (Math.floor(Math.random() * 10000) / 100).toFixed(2);
};

const getRandomMessage = (type: 'attack' | 'prevention' | 'info') => {
  let messages;
  switch (type) {
    case 'attack':
      messages = attackMessages;
      break;
    case 'prevention':
      messages = preventionMessages;
      break;
    case 'info':
      messages = infoMessages;
      break;
  }
  
  let message = messages[Math.floor(Math.random() * messages.length)];
  
  // Replace placeholders
  message = message.replace("{location}", getRandomLocation());
  message = message.replace("{ip}", getRandomIP());
  message = message.replace("{domain}", getRandomDomain());
  message = message.replace("{user}", getRandomUser());
  message = message.replace("${amount}", getRandomAmount());
  
  return message;
};

const getRandomSeverity = () => {
  const severities = ["high", "medium", "low"];
  return severities[Math.floor(Math.random() * severities.length)] as 'high' | 'medium' | 'low';
};

const getRandomLogType = () => {
  const types = ['attack', 'prevention', 'info'];
  const weights = [0.4, 0.4, 0.2]; // 40% attack, 40% prevention, 20% info
  
  const random = Math.random();
  let sum = 0;
  
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random < sum) {
      return types[i] as 'attack' | 'prevention' | 'info';
    }
  }
  
  return types[0] as 'attack';
};

const getIconForLogType = (type: string, severity?: string) => {
  switch (type) {
    case 'attack':
      return <AlertTriangle className={`w-4 h-4 ${
        severity === 'high' ? 'text-red-500' : 
        severity === 'medium' ? 'text-amber-500' : 'text-blue-500'
      }`} />;
    case 'prevention':
      return <ShieldCheck className="w-4 h-4 text-green-500" />;
    case 'info':
      return <Info className="w-4 h-4 text-blue-400" />;
    default:
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
  }
};

const RealTimeActivityLog = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  useEffect(() => {
    // Generate initial logs
    const initialLogs = Array.from({ length: 10 }, (_, i) => {
      const type = getRandomLogType();
      return {
        id: i,
        type,
        message: getRandomMessage(type),
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)), // Random time in the last hour
        severity: type === 'attack' ? getRandomSeverity() : undefined,
      };
    }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    setLogs(initialLogs);
    
    // Add new logs periodically
    const interval = setInterval(() => {
      const type = getRandomLogType();
      
      setLogs(prev => {
        const newLog = {
          id: Date.now(),
          type,
          message: getRandomMessage(type),
          timestamp: new Date(),
          severity: type === 'attack' ? getRandomSeverity() : undefined,
        };
        
        // Keep only the last 50 logs
        return [newLog, ...prev].slice(0, 50);
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="rounded-xl card-glass p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Activity Log</h2>
          <p className="text-slate-400 text-sm">Real-time security events</p>
        </div>
        <div className="flex items-center gap-2 bg-navy-800/60 px-3 py-1.5 rounded-full">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-slate-300">Live updates</span>
        </div>
      </div>
      
      <div className="space-y-3 h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-navy-700 scrollbar-track-navy-900">
        {logs.map((log) => (
          <div 
            key={log.id} 
            className="flex items-start gap-3 bg-navy-800/30 rounded-lg p-3 border-l-2 animate-fade-in"
            style={{ 
              borderLeftColor: 
                log.type === 'attack' 
                  ? (log.severity === 'high' ? '#ef4444' : log.severity === 'medium' ? '#f59e0b' : '#3b82f6') 
                  : log.type === 'prevention' 
                    ? '#10b981' 
                    : '#3b82f6' 
            }}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getIconForLogType(log.type, log.severity)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white">{log.message}</p>
              <div className="flex items-center mt-1">
                <p className="text-xs text-slate-400">
                  {log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
                {log.type === 'attack' && log.severity && (
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                    log.severity === 'high' ? 'bg-red-500/20 text-red-400' : 
                    log.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' : 
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {log.severity} severity
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeActivityLog;
