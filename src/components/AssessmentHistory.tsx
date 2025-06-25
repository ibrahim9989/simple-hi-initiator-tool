
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, History, Calendar, Target, Trophy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AssessmentResult } from '@/pages/Index';
import { useLanguage } from '@/hooks/useLanguage';

interface AssessmentHistoryProps {
  onBack: () => void;
}

export const AssessmentHistory: React.FC<AssessmentHistoryProps> = ({ onBack }) => {
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetchAssessmentHistory();
  }, []);

  const fetchAssessmentHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('assessment_results')
        .select('*')
        .order('completed_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        const transformedResults: AssessmentResult[] = data.map(item => ({
          id: item.id,
          age_group: item.age_group,
          total_questions: item.total_questions,
          correct_answers: item.correct_answers,
          score_percentage: item.score_percentage,
          responses: Array.isArray(item.responses) ? item.responses : [],
          risk_level: item.risk_level,
          completed_at: item.completed_at
        }));
        setAssessments(transformedResults);
      }
    } catch (error) {
      console.error('Error fetching assessment history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500';
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <History className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-300 text-xl">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 min-h-screen">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('back')}
          </Button>
          <h1 className="text-xl md:text-3xl font-bold text-white">
            {t('assessmentHistory')}
          </h1>
        </div>
      </div>

      {/* Assessment List */}
      {assessments.length === 0 ? (
        <Card className="bg-slate-800/50 border-slate-700 p-8 text-center">
          <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 text-lg">{t('noAssessmentsYet')}</p>
        </Card>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="bg-slate-800/50 border-slate-700 overflow-hidden">
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left Side - Main Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-purple-500 text-purple-400">
                        {assessment.age_group} {t('years')}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={getRiskLevelColor(assessment.risk_level)}
                      >
                        {t(assessment.risk_level.toLowerCase() + 'Risk')} {/* This will need to be handled in translations */}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-gray-300 text-sm mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(assessment.completed_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {assessment.total_questions} {t('totalQuestions').toLowerCase()}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Score */}
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm text-gray-400">{t('score')}</span>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {Math.round(assessment.score_percentage)}%
                      </div>
                      <div className="text-sm text-gray-400">
                        {assessment.correct_answers}/{assessment.total_questions}
                      </div>
                    </div>

                    {/* Score Circle */}
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-700"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-purple-500"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray={`${assessment.score_percentage}, 100`}
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {Math.round(assessment.score_percentage)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
