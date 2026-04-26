import { useState } from 'react';
import api from '../services/api';
import { Loader2, BrainCircuit, ArrowRight, RefreshCw, Trophy, CheckCircle } from 'lucide-react';

const QuizComponent = ({ lectureId }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const generateQuiz = async () => {
    try {
      setLoading(true);
      const res = await api.post(`/ai/generate-quiz/${lectureId}`);
      const quizData = res.data?.data?.quiz || res.data?.data || res.data;
      if (quizData) {
        setQuestions(quizData);
      } else {
        throw new Error('No quiz returned from AI');
      }
    } catch (error) {
      console.error("Failed to generate quiz", error);
      alert(error.response?.data?.message || error.message || "Failed to generate quiz");
    } finally {
      setLoading(false);
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowResult(false);
      setSelectedOption(null);
    }
  };

  const handleOptionSelect = (option) => {
    if (selectedOption !== null) return; // Prevent changing answer
    setSelectedOption(option);
    
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  if (!questions && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
          <BrainCircuit className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Test Your Knowledge</h3>
        <p className="text-gray-400 mb-6 max-w-md">Our AI will generate a quick quiz based on the lecture to help reinforce what you've learned.</p>
        <button 
          onClick={generateQuiz}
          className="px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium transition-colors shadow-lg shadow-accent/20"
        >
          Generate Quiz
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-accent mb-4 mx-auto" />
        <p className="text-white font-medium">Crafting perfect questions...</p>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";
    if (percentage === 100) message = "Perfect! You've mastered this topic.";
    else if (percentage >= 70) message = "Great job! You have a solid understanding.";
    else message = "Good effort! You might want to review the notes.";

    return (
      <div className="flex flex-col items-center justify-center h-full max-h-[600px] text-center p-8 bg-dark-card rounded-2xl border border-dark-border">
        <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-6 shadow-xl shadow-accent/20">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
        <p className="text-gray-400 mb-8">{message}</p>
        
        <div className="flex items-center gap-8 mb-10">
          <div className="text-center">
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary mb-1">
              {score}/{questions.length}
            </div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Correct</div>
          </div>
          <div className="w-px h-16 bg-dark-border"></div>
          <div className="text-center">
            <div className="text-5xl font-black text-white mb-1">
              {percentage}%
            </div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Accuracy</div>
          </div>
        </div>

        <button 
          onClick={generateQuiz}
          className="flex items-center gap-2 px-6 py-3 bg-dark-border hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retake Quiz
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentQuestionIndex ? 'w-8 bg-accent' : 
                i < currentQuestionIndex ? 'w-2 bg-accent/50' : 'w-2 bg-dark-border'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-dark-card rounded-2xl p-6 sm:p-8 border border-dark-border shadow-xl mb-8 flex-grow">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 leading-relaxed">
          {currentQ.question}
        </h3>

        <div className="space-y-4">
          {currentQ.options.map((option, i) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQ.correctAnswer;
            
            // Determine styles based on state
            let optionStyles = "border-dark-border bg-dark-bg/50 hover:border-accent/50 hover:bg-dark-bg";
            
            if (selectedOption !== null) {
              if (isCorrect) {
                optionStyles = "border-green-500 bg-green-500/10 text-green-100";
              } else if (isSelected && !isCorrect) {
                optionStyles = "border-red-500 bg-red-500/10 text-red-100";
              } else {
                optionStyles = "border-dark-border bg-dark-bg/20 opacity-50";
              }
            } else if (isSelected) {
              optionStyles = "border-accent bg-accent/10";
            }

            return (
              <button
                key={i}
                onClick={() => handleOptionSelect(option)}
                disabled={selectedOption !== null}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${optionStyles}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedOption !== null && isCorrect ? 'border-green-500 bg-green-500 text-white' :
                    selectedOption !== null && isSelected && !isCorrect ? 'border-red-500 bg-red-500 text-white' :
                    'border-gray-500'
                  }`}>
                    {selectedOption !== null && isCorrect && <CheckCircle className="w-4 h-4" />}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end mt-auto">
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="flex items-center gap-2 px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium transition-colors shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
