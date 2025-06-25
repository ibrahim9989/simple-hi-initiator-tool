
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Users, Briefcase, Heart } from 'lucide-react';

type AgeGroup = '13-17' | '18-30' | '31-60' | '61-90';

interface AgeGroupSelectionProps {
  onSelectAgeGroup: (ageGroup: AgeGroup) => void;
}

const ageGroups = [
  {
    range: '13-17' as AgeGroup,
    title: 'Teen Digital Natives',
    description: 'Social media focused scenarios',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500',
    scenarios: ['Social Media Scams', 'Fake Giveaways', 'Online Romance']
  },
  {
    range: '18-30' as AgeGroup,
    title: 'Young Professionals',
    description: 'Job & lifestyle focused scenarios',
    icon: Briefcase,
    gradient: 'from-blue-500 to-purple-500',
    scenarios: ['Fashion Scams', 'Job Offers', 'Romance Scams']
  },
  {
    range: '31-60' as AgeGroup,
    title: 'Working Adults',
    description: 'Family & finance focused scenarios',
    icon: Shield,
    gradient: 'from-green-500 to-blue-500',
    scenarios: ['Courier Scams', 'Marketplace Fraud', 'Bill Scams']
  },
  {
    range: '61-90' as AgeGroup,
    title: 'Senior Citizens',
    description: 'Health & banking focused scenarios',
    icon: Heart,
    gradient: 'from-orange-500 to-red-500',
    scenarios: ['Banking Scams', 'Health Schemes', 'Aadhaar Fraud']
  }
];

export const AgeGroupSelection: React.FC<AgeGroupSelectionProps> = ({ onSelectAgeGroup }) => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-16 h-16 text-purple-400 mr-4" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            CYREX
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          Cybersecurity Assessment Platform
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Protect yourself from cyber crimes with our comprehensive assessment. 
          Choose your age group to begin personalized scenario-based training.
        </p>
      </div>

      {/* Age Group Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {ageGroups.map((group) => {
          const IconComponent = group.icon;
          return (
            <Card 
              key={group.range}
              className="relative bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => onSelectAgeGroup(group.range)}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${group.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              
              <div className="relative p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${group.gradient} mr-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Age {group.range}
                    </h3>
                    <p className="text-purple-300 font-medium">
                      {group.title}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">
                  {group.description}
                </p>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Assessment includes:</p>
                  <div className="flex flex-wrap gap-2">
                    {group.scenarios.map((scenario) => (
                      <span 
                        key={scenario}
                        className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-sm"
                      >
                        {scenario}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className={`w-full bg-gradient-to-r ${group.gradient} hover:opacity-90 transition-opacity duration-300 font-semibold`}
                >
                  Start Assessment
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-gray-500 text-sm">
          Assessment takes approximately 10-15 minutes to complete
        </p>
      </div>
    </div>
  );
};
