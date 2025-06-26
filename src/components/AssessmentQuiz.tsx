
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, ChevronRight, AlertTriangle, ChevronLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AssessmentResult } from '@/pages/Index';
import { useLanguage } from '@/hooks/useLanguage';

type AgeGroup = '13-17' | '18-30' | '31-60' | '61-90';

interface Question {
  id: string;
  scam_number: number;
  theme: string;
  scenario_number: number;
  scenario_title: string;
  scenario_description: string;
  options: string[];
  correct_answer: number;
}

interface ScamResult {
  scam_number: number;
  theme: string;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  risk_level: string;
}

interface AssessmentQuizProps {
  ageGroup: AgeGroup;
  onComplete: (result: AssessmentResult) => void;
  onBack: () => void;
}

export const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({ ageGroup, onComplete, onBack }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentScam, setCurrentScam] = useState(1);
  const [scamResults, setScamResults] = useState<ScamResult[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    fetchQuestions();
  }, [ageGroup]);

  const fetchQuestions = async () => {
    try {
      console.log('Fetching questions for age group:', ageGroup);
      const { data, error } = await supabase
        .from('assessment_questions')
        .select('*')
        .eq('age_group', ageGroup)
        .order('scam_number', { ascending: true })
        .order('scenario_number', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Raw data from database:', data);
      
      if (data && data.length > 0) {
        // Transform the data to match our Question interface
        const transformedQuestions: Question[] = data.map(item => ({
          id: item.id,
          scam_number: item.scam_number,
          theme: item.theme,
          scenario_number: item.scenario_number,
          scenario_title: item.scenario_title,
          scenario_description: item.scenario_description,
          options: Array.isArray(item.options) ? item.options.map(option => String(option)) : [],
          correct_answer: item.correct_answer
        }));
        
        console.log('Transformed questions:', transformedQuestions);
        setQuestions(transformedQuestions);
        
        // Set current scam based on first question
        if (transformedQuestions.length > 0) {
          setCurrentScam(transformedQuestions[0].scam_number);
        }
      } else {
        console.log('No questions found for age group:', ageGroup);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    // Auto-advance to next question after 1 second
    setTimeout(() => {
      handleNextQuestion(answerIndex);
    }, 1000);
  };

  const handleNextQuestion = (answerIndex?: number) => {
    const answer = answerIndex !== undefined ? answerIndex : selectedAnswer;
    if (answer === null) return;

    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    // Check if this is the end of current scam
    const currentQuestion = questions[currentQuestionIndex];
    const currentScamQuestions = questions.filter(q => q.scam_number === currentQuestion.scam_number);
    const currentScamStartIndex = questions.findIndex(q => q.scam_number === currentQuestion.scam_number);
    const currentScamAnswers = newAnswers.slice(
      currentScamStartIndex,
      currentScamStartIndex + currentScamQuestions.length
    );

    // If we completed current scam, calculate its result
    if (currentScamAnswers.length === currentScamQuestions.length) {
      const correctAnswers = currentScamQuestions.reduce((count, question, index) => {
        return count + (currentScamAnswers[index] === question.correct_answer ? 1 : 0);
      }, 0);

      const scorePercentage = (correctAnswers / currentScamQuestions.length) * 100;
      let riskLevel = 'Low';
      if (scorePercentage < 40) riskLevel = 'Critical';
      else if (scorePercentage < 60) riskLevel = 'High';
      else if (scorePercentage < 80) riskLevel = 'Medium';

      const scamResult: ScamResult = {
        scam_number: currentQuestion.scam_number,
        theme: currentQuestion.theme,
        total_questions: currentScamQuestions.length,
        correct_answers: correctAnswers,
        score_percentage: scorePercentage,
        risk_level: riskLevel
      };

      setScamResults(prev => [...prev, scamResult]);
    }

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      
      // Update current scam if we moved to next scam
      const nextQuestion = questions[nextIndex];
      if (nextQuestion.scam_number !== currentScam) {
        setCurrentScam(nextQuestion.scam_number);
      }
    } else {
      submitAssessment(newAnswers);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setSelectedAnswer(userAnswers[prevIndex] || null);
      
      // Remove the last answer from userAnswers
      setUserAnswers(prev => prev.slice(0, -1));
      
      // Update current scam
      const prevQuestion = questions[prevIndex];
      setCurrentScam(prevQuestion.scam_number);
    }
  };

  const submitAssessment = async (answers: number[]) => {
    setSubmitting(true);
    
    try {
      // Calculate overall score
      let totalCorrect = 0;
      answers.forEach((answer, index) => {
        if (answer === questions[index].correct_answer) {
          totalCorrect++;
        }
      });

      const overallScore = (totalCorrect / questions.length) * 100;
      
      // Determine overall risk level
      let overallRiskLevel = 'Low';
      if (overallScore < 40) overallRiskLevel = 'Critical';
      else if (overallScore < 60) overallRiskLevel = 'High';
      else if (overallScore < 80) overallRiskLevel = 'Medium';

      // Convert ScamResult[] to plain objects to fix TypeScript error
      const scamResultsData = scamResults.map(result => ({
        scam_number: result.scam_number,
        theme: result.theme,
        total_questions: result.total_questions,
        correct_answers: result.correct_answers,
        score_percentage: result.score_percentage,
        risk_level: result.risk_level
      }));

      // Save to database
      const { data, error } = await supabase
        .from('assessment_results')
        .insert({
          age_group: ageGroup,
          total_questions: questions.length,
          correct_answers: totalCorrect,
          score_percentage: overallScore,
          responses: answers,
          risk_level: overallRiskLevel,
          scam_results: scamResultsData
        })
        .select()
        .single();

      if (error) throw error;

      // Transform the response to match AssessmentResult interface
      const result: AssessmentResult = {
        id: data.id,
        age_group: data.age_group,
        total_questions: data.total_questions,
        correct_answers: data.correct_answers,
        score_percentage: data.score_percentage,
        responses: Array.isArray(data.responses) ? data.responses : [],
        risk_level: data.risk_level,
        completed_at: data.completed_at
      };

      onComplete(result);
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-300 text-xl">{t('loadingAssessment')}</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-300 text-xl">{t('noQuestionsAvailable')}</p>
          <p className="text-gray-400 text-sm mt-2">Age group: {ageGroup}</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  // Get current scam progress
  const currentScamQuestions = questions.filter(q => q.scam_number === currentScam);
  const currentScamStartIndex = questions.findIndex(q => q.scam_number === currentScam);
  const currentScamProgress = currentQuestionIndex - currentScamStartIndex + 1;

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 min-h-screen">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t('back')}
            </Button>
            <h1 className="text-lg md:text-3xl font-bold text-white">
              {t('cyrexAssessment')}
            </h1>
          </div>
          <div className="text-gray-400 text-sm md:text-base">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
        <Progress value={progress} className="w-full h-2" />
        
        {/* Scam Progress Indicator */}
        <div className="mt-3 flex justify-center">
          <div className="flex gap-2">
            {[1, 2, 3].map(scamNum => (
              <div
                key={scamNum}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  scamNum === currentScam
                    ? 'bg-purple-600 text-white'
                    : scamNum < currentScam
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-600 text-gray-300'
                }`}
              >
                Scam {scamNum}
                {scamNum === currentScam && (
                  <span className="ml-1 opacity-75">
                    ({currentScamProgress}/{currentScamQuestions.length})
                  </span>
                )}
                {scamNum < currentScam && <span className="ml-1">✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <Card className="bg-slate-800/50 border-slate-700 mb-4 md:mb-6">
        <div className="p-4 md:p-6 lg:p-8">
          {/* Theme and Title */}
          <div className="mb-4 md:mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2 md:px-3 py-1 bg-purple-600 text-white rounded-full text-xs md:text-sm font-medium">
                {currentQuestion.theme}
              </span>
              <span className="text-gray-400 text-xs md:text-sm">
                Scam {currentScam} - Scenario {currentQuestion.scenario_number}
              </span>
            </div>
            <h2 className="text-base md:text-xl lg:text-2xl font-bold text-white mb-3 md:mb-4 leading-relaxed">
              {currentQuestion.scenario_title}
            </h2>
          </div>

          {/* Scenario Description */}
          <div className="mb-4 md:mb-6 lg:mb-8">
            <div className="bg-slate-700/50 rounded-lg p-3 md:p-4 lg:p-6 border-l-4 border-purple-500">
              <p className="text-gray-300 leading-relaxed text-sm md:text-base lg:text-lg whitespace-pre-line break-words">
                {currentQuestion.scenario_description}
              </p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-2 md:space-y-3 lg:space-y-4 mb-4 md:mb-6 lg:mb-8">
            <p className="text-white font-medium mb-3 md:mb-4 text-sm md:text-base">{t('whatWouldYouDo')}</p>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index + 1)}
                className={`w-full p-3 md:p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index + 1
                    ? 'border-purple-500 bg-purple-500/20 text-white'
                    : 'border-slate-600 bg-slate-700/30 text-gray-300 hover:border-slate-500 hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-start gap-2 md:gap-3">
                  <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                    selectedAnswer === index + 1 
                      ? 'border-purple-500 bg-purple-500' 
                      : 'border-slate-500'
                  }`}>
                    {selectedAnswer === index + 1 && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <p className="leading-relaxed text-sm md:text-base break-words whitespace-pre-line">{option}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center flex-wrap gap-2">
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              size="sm"
              className="border-slate-600 text-gray-300 hover:bg-slate-700/50 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t('previous')}
            </Button>

            {submitting && (
              <div className="flex items-center text-gray-400 text-sm">
                <div className="animate-spin w-4 h-4 md:w-5 md:h-5 border-2 border-purple-500 border-t-transparent rounded-full mr-2"></div>
                {t('submitting')}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
