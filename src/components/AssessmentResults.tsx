
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Trophy,
  Target,
  BookOpen,
  ChevronLeft,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { AssessmentResult } from '@/pages/Index';

interface ScamResult {
  scam_number: number;
  theme: string;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  risk_level: string;
}

interface AssessmentResultsProps {
  result: AssessmentResult;
  onRestart: () => void;
  onBack: () => void;
}

const getRiskLevelConfig = (riskLevel: string) => {
  switch (riskLevel) {
    case 'Low':
      return {
        icon: CheckCircle,
        color: 'text-green-400',
        bgColor: 'bg-green-500/20',
        borderColor: 'border-green-500',
        gradient: 'from-green-500 to-emerald-500',
        title: 'Low Risk - Excellent Security Awareness!',
        description: 'You demonstrate strong cybersecurity awareness and are well-equipped to identify and avoid common scams.'
      };
    case 'Medium':
      return {
        icon: Shield,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
        borderColor: 'border-yellow-500',
        gradient: 'from-yellow-500 to-orange-500',
        title: 'Medium Risk - Good Foundation',
        description: 'You have a solid understanding of cybersecurity but could benefit from additional awareness in certain areas.'
      };
    case 'High':
      return {
        icon: AlertTriangle,
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/20',
        borderColor: 'border-orange-500',
        gradient: 'from-orange-500 to-red-500',
        title: 'High Risk - Improvement Needed',
        description: 'You may be vulnerable to certain types of cyber attacks. Consider additional cybersecurity training.'
      };
    case 'Critical':
      return {
        icon: XCircle,
        color: 'text-red-400',
        bgColor: 'bg-red-500/20',
        borderColor: 'border-red-500',
        gradient: 'from-red-500 to-pink-500',
        title: 'Critical Risk - Immediate Action Required',
        description: 'You are at high risk of falling victim to cyber crimes. Immediate cybersecurity education is strongly recommended.'
      };
    default:
      return {
        icon: Shield,
        color: 'text-gray-400',
        bgColor: 'bg-gray-500/20',
        borderColor: 'border-gray-500',
        gradient: 'from-gray-500 to-slate-500',
        title: 'Assessment Complete',
        description: 'Your cybersecurity assessment has been completed.'
      };
  }
};

const getScoreMessage = (percentage: number) => {
  if (percentage >= 90) return "Outstanding! You're a cybersecurity expert!";
  if (percentage >= 80) return "Excellent cybersecurity awareness!";
  if (percentage >= 70) return "Good security knowledge with room for improvement.";
  if (percentage >= 60) return "Fair understanding, but additional training recommended.";
  if (percentage >= 40) return "Basic awareness present, significant improvement needed.";
  return "Urgent cybersecurity training required.";
};

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({ result, onRestart, onBack }) => {
  const riskConfig = getRiskLevelConfig(result.risk_level);
  const IconComponent = riskConfig.icon;
  const scoreMessage = getScoreMessage(result.score_percentage);

  // Parse scam results from the database response
  const scamResults: ScamResult[] = Array.isArray(result.responses) && 
    typeof result.responses[0] === 'object' && 
    'scam_results' in result.responses[0] 
    ? result.responses[0].scam_results : [];

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-center justify-center mb-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white absolute left-4 top-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
          Assessment Complete
        </h1>
        <p className="text-gray-400">
          Age Group: {result.age_group} • Completed on {new Date(result.completed_at).toLocaleDateString()}
        </p>
      </div>

      {/* Main Results Card */}
      <Card className={`bg-slate-800/50 border-2 ${riskConfig.borderColor} mb-6 md:mb-8 overflow-hidden`}>
        <div className={`h-2 bg-gradient-to-r ${riskConfig.gradient}`} />
        <div className="p-4 md:p-6">
          {/* Risk Level Header */}
          <div className="flex flex-col md:flex-row items-center justify-center mb-6 text-center md:text-left">
            <div className={`p-4 rounded-full ${riskConfig.bgColor} mb-4 md:mb-0 md:mr-4`}>
              <IconComponent className={`w-8 h-8 md:w-12 md:h-12 ${riskConfig.color}`} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                {riskConfig.title}
              </h2>
              <p className="text-gray-300 text-sm md:text-base">
                {riskConfig.description}
              </p>
            </div>
          </div>

          {/* Overall Score Display */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-xl md:text-2xl font-bold text-white">
                  {Math.round(result.score_percentage)}%
                </span>
              </div>
            </div>
            <p className="text-lg text-gray-300 mb-2">
              Overall Score: {result.correct_answers} out of {result.total_questions} correct
            </p>
            <p className="text-gray-400 text-sm">
              {scoreMessage}
            </p>
          </div>
        </div>
      </Card>

      {/* Scam-wise Results */}
      {scamResults.length > 0 && (
        <div className="mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
            Performance by Scam Type
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scamResults.map((scam, index) => {
              const scamRiskConfig = getRiskLevelConfig(scam.risk_level);
              const ScamIcon = scamRiskConfig.icon;
              
              return (
                <Card key={index} className={`bg-slate-800/50 border ${scamRiskConfig.borderColor} p-4`}>
                  <div className="text-center">
                    <div className={`inline-flex p-3 rounded-full ${scamRiskConfig.bgColor} mb-3`}>
                      <ScamIcon className={`w-6 h-6 ${scamRiskConfig.color}`} />
                    </div>
                    <h4 className="font-bold text-white mb-2 text-sm">
                      Scam {scam.scam_number}: {scam.theme}
                    </h4>
                    <div className="mb-3">
                      <div className={`text-2xl font-bold ${scamRiskConfig.color} mb-1`}>
                        {Math.round(scam.score_percentage)}%
                      </div>
                      <div className="text-xs text-gray-400">
                        {scam.correct_answers}/{scam.total_questions} correct
                      </div>
                    </div>
                    <Progress 
                      value={scam.score_percentage} 
                      className="h-2 mb-2"
                    />
                    <div className={`text-xs font-medium ${scamRiskConfig.color}`}>
                      {scam.risk_level} Risk
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card className="bg-slate-800/50 border-slate-700 p-4 md:p-6">
          <div className="flex items-center mb-4">
            <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Correct Answers</p>
              <p className="text-xl md:text-2xl font-bold text-white">{result.correct_answers}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-4 md:p-6">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Total Questions</p>
              <p className="text-xl md:text-2xl font-bold text-white">{result.total_questions}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-4 md:p-6">
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Risk Level</p>
              <p className={`text-xl md:text-2xl font-bold ${riskConfig.color}`}>{result.risk_level}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="bg-slate-800/50 border-slate-700 mb-6 md:mb-8">
        <div className="p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4">Recommendations</h3>
          <div className="space-y-4">
            {result.risk_level === 'Critical' && (
              <>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm md:text-base">
                    Consider taking a comprehensive cybersecurity awareness course immediately.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm md:text-base">
                    Be extra cautious when receiving unsolicited calls, messages, or emails.
                  </p>
                </div>
              </>
            )}
            
            {result.risk_level === 'High' && (
              <>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm md:text-base">
                    Review common scam patterns and practice identifying red flags.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm md:text-base">
                    Always verify requests for personal information through official channels.
                  </p>
                </div>
              </>
            )}

            {(result.risk_level === 'Medium' || result.risk_level === 'Low') && (
              <>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm md:text-base">
                    Keep up with the latest cybersecurity trends and threats.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm md:text-base">
                    Share your knowledge with friends and family to help them stay safe online.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Take Another Assessment
        </Button>
      </div>
    </div>
  );
};
