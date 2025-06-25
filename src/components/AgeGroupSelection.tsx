
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Users, Briefcase, Heart, History } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

type AgeGroup = '13-17' | '18-30' | '31-60' | '61-90';

interface AgeGroupSelectionProps {
  onSelectAgeGroup: (ageGroup: AgeGroup) => void;
  onViewHistory: () => void;
}

export const AgeGroupSelection: React.FC<AgeGroupSelectionProps> = ({ onSelectAgeGroup, onViewHistory }) => {
  const { t } = useLanguage();

  const ageGroups = [
    {
      range: '13-17' as AgeGroup,
      title: t('teenagers'),
      description: t('years'),
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      color: 'text-blue-400'
    },
    {
      range: '18-30' as AgeGroup,
      title: t('youngAdults'),
      description: t('years'),
      icon: Briefcase,
      gradient: 'from-green-500 to-emerald-500',
      color: 'text-green-400'
    },
    {
      range: '31-60' as AgeGroup,
      title: t('adults'),
      description: t('years'),
      icon: Shield,
      gradient: 'from-purple-500 to-pink-500',
      color: 'text-purple-400'
    },
    {
      range: '61-90' as AgeGroup,
      title: t('seniors'),
      description: t('years'),
      icon: Heart,
      gradient: 'from-orange-500 to-red-500',
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col justify-center">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-12 h-12 md:w-16 md:h-16 text-purple-400 mr-3" />
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            CYREX
          </h1>
        </div>
        <p className="text-gray-300 mb-2 text-lg md:text-xl">
          {t('cybersecurityAssessmentPlatform')}
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
          {t('chooseYourAgeGroup')}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {t('selectAgeGroupToStart')}
        </p>
      </div>

      {/* History Button */}
      <div className="flex justify-center mb-8">
        <Button
          onClick={onViewHistory}
          variant="outline"
          className="border-slate-600 text-gray-300 hover:bg-slate-700/50"
        >
          <History className="w-4 h-4 mr-2" />
          {t('viewHistory')}
        </Button>
      </div>

      {/* Age Group Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
        {ageGroups.map((group) => {
          const IconComponent = group.icon;
          return (
            <Card 
              key={group.range}
              className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden"
              onClick={() => onSelectAgeGroup(group.range)}
            >
              <div className="p-6 md:p-8 text-center relative">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${group.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${group.gradient} mb-4 md:mb-6`}>
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {group.range}
                  </h3>
                  
                  <p className={`text-lg font-medium ${group.color} mb-4`}>
                    {group.title}
                  </p>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${group.gradient} hover:opacity-90 text-white border-0`}
                  >
                    {t('startAssessment')}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
