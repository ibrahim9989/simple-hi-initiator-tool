
import React, { useState } from 'react';
import { AgeGroupSelection } from '@/components/AgeGroupSelection';
import { AssessmentQuiz } from '@/components/AssessmentQuiz';
import { AssessmentResults } from '@/components/AssessmentResults';
import { AuthPage } from '@/components/AuthPage';
import { ProfileCompletion } from '@/components/ProfileCompletion';
import { AssessmentHistory } from '@/components/AssessmentHistory';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useAuth } from '@/hooks/useAuth';

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
  const [currentStep, setCurrentStep] = useState<'auth' | 'profile' | 'age-selection' | 'quiz' | 'results' | 'history'>('auth');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const { user, session, loading } = useAuth();

  console.log('Auth state:', { user: !!user, session: !!session, loading });

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LanguageSelector />
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!user || !session) {
    return (
      <>
        <LanguageSelector />
        <AuthPage />
      </>
    );
  }

  // Check if profile is complete
  const isProfileComplete = user.user_metadata?.name && user.user_metadata?.phone;
  
  // If profile is not complete and we're not already on profile step, show profile completion
  if (!isProfileComplete && currentStep === 'auth') {
    setCurrentStep('profile');
  }
  
  // If profile is complete and we're still on auth step, move to age selection
  if (isProfileComplete && currentStep === 'auth') {
    setCurrentStep('age-selection');
  }

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

  const handleBackToAgeSelection = () => {
    setCurrentStep('age-selection');
    setSelectedAgeGroup(null);
  };

  const handleBackToQuiz = () => {
    setCurrentStep('quiz');
    setAssessmentResult(null);
  };

  const handleViewHistory = () => {
    setCurrentStep('history');
  };

  const handleBackFromHistory = () => {
    setCurrentStep('age-selection');
  };

  const handleProfileComplete = () => {
    setCurrentStep('age-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <LanguageSelector />
      
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
        {currentStep === 'profile' && (
          <ProfileCompletion onComplete={handleProfileComplete} />
        )}
        
        {currentStep === 'age-selection' && (
          <AgeGroupSelection 
            onSelectAgeGroup={handleAgeGroupSelect}
            onViewHistory={handleViewHistory}
          />
        )}
        
        {currentStep === 'quiz' && selectedAgeGroup && (
          <AssessmentQuiz 
            ageGroup={selectedAgeGroup} 
            onComplete={handleQuizComplete}
            onBack={handleBackToAgeSelection}
          />
        )}
        
        {currentStep === 'results' && assessmentResult && (
          <AssessmentResults 
            result={assessmentResult} 
            onRestart={handleRestart}
            onBack={handleBackToQuiz}
          />
        )}

        {currentStep === 'history' && (
          <AssessmentHistory onBack={handleBackFromHistory} />
        )}
      </div>
    </div>
  );
};

export default Index;
