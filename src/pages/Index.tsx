
import React, { useState } from 'react';
import { AgeGroupSelection } from '@/components/AgeGroupSelection';
import { AssessmentQuiz } from '@/components/AssessmentQuiz';
import { AssessmentResults } from '@/components/AssessmentResults';

type AgeGroup = '13-17' | '18-30' | '31-60' | '61-90';

export interface AssessmentResult {
  id: string;
  age_group: string;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  responses: any[];
  risk_level: string;
  completed_at: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'age-selection' | 'quiz' | 'results'>('age-selection');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const handleAgeGroupSelect = (ageGroup: AgeGroup) => {
    setSelectedAgeGroup(ageGroup);
    setCurrentStep('quiz');
  };

  const handleQuizComplete = (result: AssessmentResult) => {
    setAssessmentResult(result);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('age-selection');
    setSelectedAgeGroup(null);
    setAssessmentResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
      </div>

      {/* Grid Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {currentStep === 'age-selection' && (
          <AgeGroupSelection onSelectAgeGroup={handleAgeGroupSelect} />
        )}
        
        {currentStep === 'quiz' && selectedAgeGroup && (
          <AssessmentQuiz 
            ageGroup={selectedAgeGroup} 
            onComplete={handleQuizComplete}
          />
        )}
        
        {currentStep === 'results' && assessmentResult && (
          <AssessmentResults 
            result={assessmentResult} 
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
