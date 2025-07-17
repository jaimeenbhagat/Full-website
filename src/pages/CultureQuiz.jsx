import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { quizData } from "../components/CultureQuiz/quizData";
import { getCultureLevel } from "../components/CultureQuiz/getCultureLevel";

const CultureQuiz = () => {
  // State variables for the quiz application
  const [answers, setAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Backend integration state (copied from ROI calculator)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [validationErrors, setValidationErrors] = useState({});

  const totalQuestions = quizData.length;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  // Refs for scrolling to questions
  const questionRefs = useRef({});
  const quizContentRef = useRef(null);

  // Clear status messages after 5 seconds (copied from ROI calculator)
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 3001);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Calculate total score and answered count whenever answers change
  useEffect(() => {
    let currentScore = 0;
    let currentAnsweredCount = 0;
    for (const questionId in answers) {
      if (answers[questionId] !== undefined) {
        currentScore += answers[questionId];
        currentAnsweredCount++;
      }
    }
    setTotalScore(currentScore);
    setAnsweredCount(currentAnsweredCount);
  }, [answers]);

  // Effect to scroll to the next unanswered question
  useEffect(() => {
    if (showQuiz && quizContentRef.current) {
      const firstUnansweredQuestion = quizData.find(
        (q) => answers[q.id] === undefined
      );
      if (
        firstUnansweredQuestion &&
        questionRefs.current[firstUnansweredQuestion.id]
      ) {
        setTimeout(() => {
          const headerOffset = 100; // Approximate header height
          const elementPosition =
            questionRefs.current[
              firstUnansweredQuestion.id
            ].getBoundingClientRect().top;
          const offsetPosition =
            elementPosition +
            quizContentRef.current.scrollTop -
            quizContentRef.current.getBoundingClientRect().top -
            headerOffset -
            20;

          quizContentRef.current.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      } else if (allQuestionsAnswered && showQuiz) {
        const submitButton = document.getElementById("submit-quiz-button");
        if (submitButton && quizContentRef.current) {
          setTimeout(() => {
            const headerOffset = 100;
            const elementPosition = submitButton.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition +
              quizContentRef.current.scrollTop -
              quizContentRef.current.getBoundingClientRect().top +
              20;

            quizContentRef.current.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }, 100);
        }
      }
    }
  }, [answeredCount, showQuiz, answers, quizData, allQuestionsAnswered]);

  // Function to handle option selection for a question
  const handleOptionSelect = (questionId, score) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: score,
    }));
  };

  // API URL function (copied from ROI calculator)
  const getApiUrl = () => {
    if (import.meta.env.MODE === 'production') {
      return import.meta.env.VITE_API_URL || 'https://onethrive-backend.onrender.com';
    } else {
      return import.meta.env.VITE_API_URL || 'http://localhost:3001';
    }
  };

  // Validation function for email (copied from ROI calculator)
  const validateEmail = () => {
    const errors = {};

    // Email validation
    if (!userEmail.trim()) {
      errors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail)) {
      errors.email = "Please enter a valid email address";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle email input submission with backend integration (updated from ROI calculator)
  const handleEmailSubmit = async () => {
    if (!validateEmail()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare form data for culture quiz
      const formData = {
        email: userEmail,
        quizType: 'culture_quiz',
        timestamp: new Date().toISOString()
      };

      console.log("Submitting culture quiz email:", formData);

      // Get API URL based on environment
      const API_URL = getApiUrl();
      console.log("Using API URL:", API_URL);
      
      const response = await fetch(`${API_URL}/api/culture-quiz-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Server response:", result);

        setSubmitStatus("success");
        setShowEmailModal(false);
        setShowQuiz(true);
        setValidationErrors({});
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server returned error:", response.status, errorData);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting culture quiz email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle quiz submission with backend integration (updated from ROI calculator)
  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const cultureResult = getCultureLevel(totalScore);
      
      // Prepare quiz results data
      const quizResultsData = {
        email: userEmail,
        totalScore: totalScore,
        totalQuestions: totalQuestions,
        maxPossibleScore: totalQuestions * 14,
        answeredCount: answeredCount,
        answers: answers,
        cultureResult: cultureResult,
        completedAt: new Date().toISOString()
      };

      console.log("Submitting culture quiz results:", quizResultsData);

      // Get API URL based on environment
      const API_URL = getApiUrl();
      
      const response = await fetch(`${API_URL}/api/culture-quiz-results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizResultsData),
      });

      console.log("Quiz results response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Quiz results server response:", result);
        setSubmitStatus("success");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server returned error:", response.status, errorData);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting culture quiz results:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setShowQuiz(false);
      setShowResults(true);
      window.scrollTo(0, 0);
    }
  };

  // Function to restart the quiz
  const handleRetakeQuiz = () => {
    setAnswers({});
    setTotalScore(0);
    setAnsweredCount(0);
    setShowResults(false);
    setShowQuiz(false);
    setShowEmailModal(false);
    setUserEmail("");
    setSubmitStatus(null);
    setValidationErrors({});
    setIsSubmitting(false);
    window.scrollTo(0, 0);
  };

  const cultureResult = getCultureLevel(totalScore);
  const progressPercentage = (answeredCount / totalQuestions) * 100;
  const firstUnansweredQuestionId = quizData.find(
    (q) => answers[q.id] === undefined
  )?.id;

  // Function to copy result to clipboard
  const copyResultToClipboard = () => {
    let textToCopy = `My company's Culture Pulse: ${cultureResult.level}!\n\n`;
    textToCopy += `Score: ${totalScore} out of ${
      totalQuestions * 14
    } possible points.\n\n`;
    cultureResult.description.forEach((point) => {
      textToCopy += `- ${point}\n`;
    });
    textToCopy += `\n${cultureResult.cta.replace(
      /\*\*/g,
      ""
    )}\n\nLearn more: [Quiz Link - replace with actual quiz URL]`;

    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      showToast("Result copied to clipboard!", "success");
    } catch (err) {
      console.error("Failed to copy result:", err);
      showToast("Failed to copy result", "error");
    } finally {
      document.body.removeChild(textArea);
    }
  };

  // Function to show toast notifications
  const showToast = (message, type = "success") => {
    const messageBox = document.createElement("div");
    messageBox.textContent = message;
    messageBox.className = `fixed bottom-20 left-1/2 transform -translate-x-1/2 px-5 py-3 rounded-lg shadow-xl opacity-0 transition-opacity duration-300 z-50 ${
      type === "success" ? "bg-[#00FFAB] text-white" : "bg-red-600 text-white"
    }`;
    document.body.appendChild(messageBox);
    setTimeout(() => {
      messageBox.style.opacity = "1";
    }, 10);
    setTimeout(() => {
      messageBox.style.opacity = "0";
      messageBox.addEventListener("transitionend", () => messageBox.remove());
    }, 3000);
  };

  // Clear validation errors when user starts typing
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
    if (validationErrors.email) {
      setValidationErrors(prev => ({
        ...prev,
        email: null
      }));
    }
  };

  const inputClasses = (fieldName) => `
    w-full p-3 rounded-lg bg-zinc-800 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FFAB] transition-colors
    ${validationErrors[fieldName] ? 'border-red-500 focus:border-red-500 focus:ring-red-400' : 'border-zinc-700 focus:border-[#00FFAB]'}
  `;

  return (
    <div className="min-h-screen flex mt-14 items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <div className="w-full max-w-3xl bg-black rounded-2xl shadow-2xl text-white flex flex-col max-h-[90vh] border border-zinc-800">
        {!showQuiz && !showResults && (
          // Introduction Section
          <section className="text-center py-8 px-6 sm:px-10">
            <h1 className="text-4xl md:text-5xl font-bold text-[#00FFAB] mb-4">
              Uncover Your Company's True Culture Pulse!
            </h1>
            <p className="text-lg md:text-xl text-white font-medium mb-8">
              Ever wondered if your workplace is a vibrant hub of innovation or
              a silent, uninspired space? This quick, anonymous quiz is your
              secret weapon to gain insights into your company's culture. Your
              answers are crucial – they could be the spark that ignites
              positive transformation and helps build an even more thriving
              environment for everyone.
            </p>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="bg-green-900/20 border border-[#00FFAB] rounded-lg p-4 flex items-center gap-3 animate-fade-in mb-6">
                <CheckCircle className="text-[#00FFAB] w-5 h-5" />
                <span className="text-[#00FFAB]">
                  Email submitted successfully! Starting your quiz...
                </span>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-900/20 border border-red-400 rounded-lg p-4 flex items-center gap-3 animate-fade-in mb-6">
                <AlertCircle className="text-red-400 w-5 h-5" />
                <span className="text-red-400">
                  Failed to submit email. Please try again or contact us directly.
                </span>
              </div>
            )}

            <button
              onClick={() => setShowEmailModal(true)}
              className="bg-[#00FFAB] text-black font-bold py-3 px-10 rounded-full text-lg hover:bg-[#00FFAB] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#00FFAB]/50"
            >
              Let's Find Out!
            </button>
          </section>
        )}

        {showQuiz && (
          // Quiz Section
          <div className="flex flex-col flex-1 overflow-hidden rounded-2xl">
            {/* Fixed Progress Header */}
            <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-sm py-6 px-6 sm:px-10 border-b border-zinc-800 rounded-t-2xl">
              <p className="text-sm text-white font-medium text-right mb-2">
                {answeredCount} of {totalQuestions} questions answered
              </p>
              <div className="w-full bg-zinc-800 rounded-full h-2.5">
                <div
                  className="bg-[#00FFAB] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Scrollable Quiz Questions Content */}
            <div
              ref={quizContentRef}
              className="flex-1 overflow-y-auto p-6 sm:p-10 pt-0"
            >
              <div className="space-y-8 mt-8">
                {quizData.map((q, index) => (
                  <div
                    key={q.id}
                    ref={(el) => (questionRefs.current[q.id] = el)}
                    className={`p-6 rounded-xl border relative transform transition-all duration-300 ease-in-out shadow-xl ${
                      answers[q.id] !== undefined
                        ? "border-[#00FFAB] bg-black shadow-[#00FFAB]/20"
                        : q.id === firstUnansweredQuestionId
                        ? "border-2 border-[#00FFAB] bg-black shadow-[#00FFAB]/30"
                        : "border-zinc-800 bg-black"
                    }`}
                  >
                    <p className="text-lg font-medium text-white mb-2 flex items-center">
                      Question {index + 1}
                      {answers[q.id] !== undefined && (
                        <svg
                          className="h-4 w-4 ml-2 text-[#00FFAB]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </p>
                    <h3
                      className={`text-2xl font-bold mb-6 ${
                        q.id === firstUnansweredQuestionId &&
                        answers[q.id] === undefined
                          ? "text-[#00FFAB]"
                          : "text-white"
                      }`}
                    >
                      {q.question}
                    </h3>
                    <div className="space-y-3">
                      {q.options.map((option) => (
                        <button
                          key={option.text}
                          onClick={() => handleOptionSelect(q.id, option.score)}
                          className={`w-full text-left py-3 px-4 rounded-lg border-2 transition-all duration-200 ease-in-out cursor-pointer font-medium transform hover:scale-[1.01] ${
                            answers[q.id] === option.score
                              ? "bg-black border-[#00FFAB] text-[#00FFAB] shadow-lg shadow-[#00FFAB]/50"
                              : "bg-black border-zinc-700 text-white hover:bg-zinc-900 hover:border-[#00FFAB] hover:text-[#00FFAB] hover:shadow-lg"
                          } focus:outline-none focus:ring-2 focus:ring-[#00FFAB] focus:ring-opacity-50`}
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12 p-6 bg-black rounded-xl border border-zinc-800 shadow-xl">
                <button
                  id="submit-quiz-button"
                  onClick={handleSubmitQuiz}
                  disabled={!allQuestionsAnswered || isSubmitting}
                  className={`font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 ease-in-out shadow-lg ${
                    !allQuestionsAnswered || isSubmitting
                      ? "bg-zinc-700 text-white cursor-not-allowed"
                      : "bg-[#00FFAB] hover:bg-[#00FFAB] text-black transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00FFAB]/50"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Reveal My Culture Persona!"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showResults && (
          // Results Section
          <section className="text-center bg-black p-6 sm:p-10 rounded-2xl shadow-2xl border border-zinc-800 flex-1 overflow-y-auto">
            <h2 className="text-3xl font-bold text-white mb-2">
              Your Company is a...
            </h2>
            <p className="text-6xl md:text-7xl font-bold text-[#00FFAB] mb-6 leading-tight">
              {cultureResult.level}
            </p>

            {/* Status Messages in Results */}
            {submitStatus === "success" && (
              <div className="bg-green-900/20 border border-[#00FFAB] rounded-lg p-4 flex items-center gap-3 animate-fade-in mb-6">
                <CheckCircle className="text-[#00FFAB] w-5 h-5" />
                <span className="text-[#00FFAB]">
                  Quiz results submitted successfully! Thank you for participating.
                </span>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-900/20 border border-red-400 rounded-lg p-4 flex items-center gap-3 animate-fade-in mb-6">
                <AlertCircle className="text-red-400 w-5 h-5" />
                <span className="text-red-400">
                  Failed to submit quiz results. Your results are still valid!
                </span>
              </div>
            )}

            {/* Score Display */}
            <div className="mb-6 mx-auto w-48 h-48 relative">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center border-4 border-[#00FFAB] shadow-lg shadow-[#00FFAB]/50">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#00FFAB]">
                    {Math.round((totalScore / (totalQuestions * 14)) * 100)}%
                  </div>
                  <div className="text-sm text-white font-medium">Score</div>
                </div>
              </div>
            </div>

            {/* Result Description */}
            <div className="text-lg text-white font-medium max-w-xl mx-auto mb-6 space-y-4 text-left">
              {cultureResult.description.map((point, index) => (
                <p key={index} className="leading-normal">
                  {point}
                </p>
              ))}
            </div>

            <p
              className="text-lg text-white font-medium mb-8"
              dangerouslySetInnerHTML={{ __html: cultureResult.cta }}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleRetakeQuiz}
                className="bg-zinc-700 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-zinc-600 transition-colors"
              >
                Retake Quiz
              </button>
              <button
                onClick={copyResultToClipboard}
                className="bg-zinc-700 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-zinc-600 transition-colors"
              >
                Copy My Result
              </button>
              <a
                href="https://onethrive.in/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00FFAB] text-black font-bold py-4 px-10 rounded-full text-xl inline-flex items-center hover:bg-[#00FFAB] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#00FFAB]/50"
              >
                <svg
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Empower Your Culture with Onthrive!
              </a>
            </div>
          </section>
        )}
      </div>

      {/* Email Collection Modal with Backend Integration */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-black p-8 rounded-2xl shadow-2xl border border-zinc-700 text-center max-w-md w-full relative">
            <button
              onClick={() => {
                setShowEmailModal(false);
                setValidationErrors({});
                setSubmitStatus(null);
              }}
              className="absolute top-4 right-4 text-white hover:text-[#00FFAB] transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-3xl font-bold text-[#00FFAB] mb-4">
              Join the Culture Pulse!
            </h2>
            <p className="text-gray-300 mb-6">
              Enter your email to get started and receive exclusive insights.
            </p>

            {/* Status Messages in Modal */}
            {submitStatus === "success" && (
              <div className="bg-green-900/20 border border-[#00FFAB] rounded-lg p-4 flex items-center gap-3 animate-fade-in mb-4">
                <CheckCircle className="text-[#00FFAB] w-5 h-5" />
                <span className="text-[#00FFAB]">
                  Email submitted successfully!
                </span>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-900/20 border border-red-400 rounded-lg p-4 flex items-center gap-3 animate-fade-in mb-4">
                <AlertCircle className="text-red-400 w-5 h-5" />
                <span className="text-red-400">
                  Failed to submit. Please try again.
                </span>
              </div>
            )}

            <input
              type="email"
              placeholder="your.email@example.com"
              className={inputClasses('email')}
              value={userEmail}
              onChange={handleEmailChange}
              onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
            />
            {validationErrors.email && (
              <p className="text-red-400 text-sm mt-1 text-left">{validationErrors.email}</p>
            )}
            <button
              onClick={handleEmailSubmit}
              disabled={isSubmitting}
              className="bg-[#00FFAB] text-black font-bold py-3 px-8 rounded-full text-lg w-full hover:bg-[#00FFAB] transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Start Quiz"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CultureQuiz;