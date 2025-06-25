
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, ChevronRight, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AssessmentResult } from '@/pages/Index';

type AgeGroup = '13-17' | '18-30' | '31-60' | '61-90';

interface Question {
  id: string;
  theme: string;
  scenario_number: number;
  scenario_title: string;
  scenario_description: string;
  options: string[];
  correct_answer: number;
}

interface AssessmentQuizProps {
  ageGroup: AgeGroup;
  onComplete: (result: AssessmentResult) => void;
}

export const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({ ageGroup, onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [ageGroup]);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('assessment_questions')
        .select('*')
        .eq('age_group', ageGroup)
        .order('theme', { ascending: true })
        .order('scenario_number', { ascending: true });

      if (error) throw error;
      
      if (data) {
        setQuestions(data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      submitAssessment(newAnswers);
    }
  };

  const submitAssessment = async (answers: number[]) => {
    setSubmitting(true);
    
    try {
      // Calculate score
      let correctAnswers = 0;
      answers.forEach((answer, index) => {
        if (answer === questions[index].correct_answer) {
          correctAnswers++;
        }
      });

      const scorePercentage = (correctAnswers / questions.length) * 100;
      
      // Determine risk level
      let riskLevel = 'Low';
      if (scorePercentage < 40) riskLevel = 'Critical';
      else if (scorePercentage < 60) riskLevel = 'High';
      else if (scorePercentage < 80) riskLevel = 'Medium';

      // Save to database
      const { data, error } = await supabase
        .from('assessment_results')
        .insert({
          age_group: ageGroup,
          total_questions: questions.length,
          correct_answers: correctAnswers,
          score_percentage: scorePercentage,
          responses: answers,
          risk_level: riskLevel
        })
        .select()
        .single();

      if (error) throw error;

      onComplete(data);
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
          <p className="text-gray-300 text-xl">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-300 text-xl">No questions available for this age group.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Cyrex Assessment
          </h1>
          <div className="text-gray-400">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
        <Progress value={progress} className="w-full h-2" />
      </div>

      {/* Question Card */}
      <Card className="bg-slate-800/50 border-slate-700 mb-8">
        <div className="p-6 md:p-8">
          {/* Theme and Title */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium">
                {currentQuestion.theme}
              </span>
              <span className="text-gray-400 text-sm">
                Scenario {currentQuestion.scenario_number}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              {currentQuestion.scenario_title}
            </h2>
          </div>

          {/* Scenario Description */}
          <div className="mb-8">
            <div className="bg-slate-700/50 rounded-lg p-4 md:p-6 border-l-4 border-purple-500">
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {currentQuestion.scenario_description}
              </p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-4 mb-8">
            <p className="text-white font-medium mb-4">What would you do?</p>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index + 1)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index + 1
                    ? 'border-purple-500 bg-purple-500/20 text-white'
                    : 'border-slate-600 bg-slate-700/30 text-gray-300 hover:border-slate-500 hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${
                    selectedAnswer === index + 1 
                      ? 'border-purple-500 bg-purple-500' 
                      : 'border-slate-500'
                  }`}>
                    {selectedAnswer === index + 1 && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <p className="leading-relaxed">{option}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Next Button */}
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null || submitting}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              'Submitting...'
            ) : currentQuestionIndex === questions.length - 1 ? (
              'Complete Assessment'
            ) : (
              <>
                Next Question
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};
