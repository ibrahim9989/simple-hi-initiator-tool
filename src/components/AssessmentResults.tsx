
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
  BookOpen
} from 'lucide-react';
import { AssessmentResult } from '@/pages/Index';

interface AssessmentResultsProps {
  result: AssessmentResult;
  onRestart: () => void;
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

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({ result, onRestart }) => {
  const riskConfig = getRiskLevelConfig(result.risk_level);
  const IconComponent = riskConfig.icon;
  const scoreMessage = getScoreMessage(result.score_percentage);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Assessment Complete
        </h1>
        <p className="text-gray-400">
          Age Group: {result.age_group} • Completed on {new Date(result.completed_at).toLocaleDateString()}
        </p>
      </div>

      {/* Main Results Card */}
      <Card className={`bg-slate-800/50 border-2 ${riskConfig.borderColor} mb-8 overflow-hidden`}>
        <div className={`h-2 bg-gradient-to-r ${riskConfig.gradient}`} />
        <div className="p-6 md:p-8">
          {/* Risk Level Header */}
          <div className="flex items-center justify-center mb-6">
            <div className={`p-4 rounded-full ${riskConfig.bgColor} mr-4`}>
              <IconComponent className={`w-12 h-12 ${riskConfig.color}`} />
            </div>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {riskConfig.title}
              </h2>
              <p className="text-gray-300">
                {riskConfig.description}
              </p>
            </div>
          </div>

          {/* Score Display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              <div className="w-28 h-28 rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {Math.round(result.score_percentage)}%
                </span>
              </div>
            </div>
            <p className="text-xl text-gray-300 mb-2">
              {result.correct_answers} out of {result.total_questions} correct
            </p>
            <p className="text-gray-400">
              {scoreMessage}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Score</span>
              <span>{Math.round(result.score_percentage)}%</span>
            </div>
            <Progress 
              value={result.score_percentage} 
              className="h-3"
            />
          </div>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center mb-4">
            <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Correct Answers</p>
              <p className="text-2xl font-bold text-white">{result.correct_answers}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center mb-4">
            <Target className="w-8 h-8 text-blue-400 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Total Questions</p>
              <p className="text-2xl font-bold text-white">{result.total_questions}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center mb-4">
            <BookOpen className="w-8 h-8 text-purple-400 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Risk Level</p>
              <p className={`text-2xl font-bold ${riskConfig.color}`}>{result.risk_level}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="bg-slate-800/50 border-slate-700 mb-8">
        <div className="p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-4">Recommendations</h3>
          <div className="space-y-4">
            {result.risk_level === 'Critical' && (
              <>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Consider taking a comprehensive cybersecurity awareness course immediately.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Be extra cautious when receiving unsolicited calls, messages, or emails.
                  </p>
                </div>
              </>
            )}
            
            {result.risk_level === 'High' && (
              <>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Review common scam patterns and practice identifying red flags.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Always verify requests for personal information through official channels.
                  </p>
                </div>
              </>
            )}

            {(result.risk_level === 'Medium' || result.risk_level === 'Low') && (
              <>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Keep up with the latest cybersecurity trends and threats.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
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
