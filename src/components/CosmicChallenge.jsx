import { useState } from "react";
import {
  Trophy,
  Rocket,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Brain,
  Sparkles,
} from "lucide-react";

const questions = [
  {
    question: "Which planet is the largest in our Solar System?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    answer: "Jupiter",
    explanation:
      "Jupiter is the largest planet in our Solar System. Its diameter is about 11 times Earth's diameter.",
    category: "The Planets",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Mercury", "Uranus"],
    answer: "Mars",
    explanation:
      "Mars appears red because iron minerals in its soil have oxidized, creating rusty-colored dust.",
    category: "The Planets",
  },
  {
    question: "What is the name of our galaxy?",
    options: ["Andromeda", "Whirlpool", "Sombrero", "Milky Way"],
    answer: "Milky Way",
    explanation:
      "Our Solar System is located in the Milky Way, a barred spiral galaxy containing billions of stars.",
    category: "Galaxies",
  },
  {
    question: "What is the closest star to Earth?",
    options: ["Sirius", "The Sun", "Proxima Centauri", "Polaris"],
    answer: "The Sun",
    explanation:
      "The Sun is our nearest star and provides most of the energy that supports life on Earth.",
    category: "Stars",
  },
  {
    question: "Which planet is famous for its extensive ring system?",
    options: ["Mars", "Venus", "Saturn", "Mercury"],
    answer: "Saturn",
    explanation:
      "Saturn has a spectacular ring system made primarily of pieces of ice and rocky material.",
    category: "The Planets",
  },
  {
    question: "What force keeps planets in orbit around the Sun?",
    options: ["Magnetism", "Friction", "Electricity", "Gravity"],
    answer: "Gravity",
    explanation:
      "The Sun's gravitational attraction helps keep planets in orbit as they move through space.",
    category: "Physics",
  },
  {
    question: "Which planet is known for rotating on its side?",
    options: ["Earth", "Uranus", "Jupiter", "Mars"],
    answer: "Uranus",
    explanation:
      "Uranus has an extreme axial tilt of about 98 degrees, making its rotation unusually sideways.",
    category: "The Planets",
  },
  {
    question: "What is the name of NASA's famous space telescope launched in 2021?",
    options: [
      "Hubble Space Telescope",
      "Kepler Telescope",
      "James Webb Space Telescope",
      "Chandra Observatory",
    ],
    answer: "James Webb Space Telescope",
    explanation:
      "The James Webb Space Telescope launched in December 2021 and observes the universe primarily in infrared light.",
    category: "Space Exploration",
  },
  {
    question: "What is a light-year a measurement of?",
    options: ["Time", "Distance", "Brightness", "Temperature"],
    answer: "Distance",
    explanation:
      "A light-year is the distance light travels in one year, approximately 9.46 trillion kilometers.",
    category: "Space Science",
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Earth", "Mercury", "Mars"],
    answer: "Mercury",
    explanation:
      "Mercury is the innermost planet in our Solar System and takes about 88 Earth days to orbit the Sun.",
    category: "The Planets",
  },
];

const TOTAL_QUESTIONS = 10;

function shuffleQuestions() {
  return [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, TOTAL_QUESTIONS);
}

export default function CosmicChallenge() {
  const [quizQuestions, setQuizQuestions] = useState(shuffleQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    try {
      return Number(localStorage.getItem("astronova-best-score")) || 0;
    } catch {
      return 0;
    }
  });

  const currentQuestion = quizQuestions[currentIndex];
  const progress = finished
    ? 100
    : ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;

  function selectAnswer(option) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(option);

    if (option === currentQuestion.answer) {
      setScore((previous) => previous + 1);
    }
  }

  function nextQuestion() {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((previous) => previous + 1);
      setSelectedAnswer(null);
      return;
    }

    setFinished(true);

    const finalScore = score;

    if (finalScore > bestScore) {
      setBestScore(finalScore);

      try {
        localStorage.setItem(
          "astronova-best-score",
          String(finalScore)
        );
      } catch {
        // The quiz remains usable if browser storage is unavailable.
      }
    }
  }

  function restartQuiz() {
    setQuizQuestions(shuffleQuestions());
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
  }

  const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);

  return (
    <section
      id="cosmic-challenge"
      className="border-y border-white/[0.06] bg-[#0B101B] py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-yellow-400">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
            Test your cosmic knowledge
          </div>

          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
            Cosmic{" "}
            <span className="text-yellow-400">Challenge.</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Ten questions. One universe of knowledge. Challenge yourself
            and discover how much you know about space.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                <Brain size={23} />
              </div>

              <div>
                <h3 className="font-bold text-white">
                  Space Knowledge Quiz
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Astronova Learning Lab
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-yellow-400/15 bg-yellow-400/5 px-4 py-2.5">
              <Trophy size={17} className="text-yellow-400" />
              <span className="text-xs text-slate-400">Best score</span>
              <span className="font-black text-yellow-400">
                {bestScore}/{TOTAL_QUESTIONS}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            {finished ? (
              /* Results */
              <div className="mx-auto max-w-xl py-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-yellow-400/20 bg-yellow-400/10">
                  {percentage >= 70 ? (
                    <Trophy size={38} className="text-yellow-400" />
                  ) : (
                    <Sparkles size={38} className="text-yellow-400" />
                  )}
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
                  Mission completed
                </p>

                <h3 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  {percentage === 100
                    ? "Cosmic Genius!"
                    : percentage >= 70
                      ? "Stellar Performance!"
                      : percentage >= 40
                        ? "Keep Exploring!"
                        : "Every Explorer Starts Somewhere!"}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  You answered {score} out of {TOTAL_QUESTIONS} questions
                  correctly.
                </p>

                <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/10 bg-[#080B14] p-6">
                  <p className="text-sm text-slate-400">
                    Your final score
                  </p>

                  <p className="mt-2 text-5xl font-black text-yellow-400">
                    {score}
                    <span className="text-2xl text-slate-500">
                      /{TOTAL_QUESTIONS}
                    </span>
                  </p>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-yellow-400 transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    {percentage}% correct answers
                  </p>
                </div>

                <button
                  onClick={restartQuiz}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-yellow-300"
                >
                  <RotateCcw size={17} />
                  Play again
                </button>
              </div>
            ) : (
              /* Question */
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300">
                    {currentQuestion.category}
                  </span>

                  <span className="text-sm text-slate-400">
                    Question{" "}
                    <span className="font-bold text-white">
                      {currentIndex + 1}
                    </span>{" "}
                    of {TOTAL_QUESTIONS}
                  </span>
                </div>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                  <div
                    className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <h3 className="mt-8 max-w-3xl text-xl font-bold leading-relaxed text-white sm:text-2xl">
                  {currentQuestion.question}
                </h3>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === currentQuestion.answer;

                    let optionStyle =
                      "border-white/10 bg-[#080B14] hover:border-yellow-400/50";

                    if (selectedAnswer !== null && isCorrect) {
                      optionStyle =
                        "border-emerald-400/40 bg-emerald-400/10";
                    } else if (isSelected && !isCorrect) {
                      optionStyle =
                        "border-red-400/40 bg-red-400/10";
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => selectAnswer(option)}
                        disabled={selectedAnswer !== null}
                        className={`flex min-h-[68px] items-center gap-4 rounded-xl border p-4 text-left transition ${optionStyle} disabled:cursor-default`}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-sm font-bold text-slate-400">
                          {String.fromCharCode(65 + index)}
                        </span>

                        <span className="flex-1 text-sm font-semibold text-slate-200">
                          {option}
                        </span>

                        {selectedAnswer !== null && isCorrect && (
                          <CheckCircle2
                            size={19}
                            className="shrink-0 text-emerald-400"
                          />
                        )}

                        {isSelected && !isCorrect && (
                          <XCircle
                            size={19}
                            className="shrink-0 text-red-400"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <div className="mt-6 rounded-xl border border-white/[0.08] bg-[#080B14] p-5">
                    <p
                      className={`flex items-center gap-2 text-sm font-bold ${
                        selectedAnswer === currentQuestion.answer
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {selectedAnswer === currentQuestion.answer ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <XCircle size={18} />
                      )}

                      {selectedAnswer === currentQuestion.answer
                        ? "Correct answer!"
                        : `Correct answer: ${currentQuestion.answer}`}
                    </p>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
                  <p className="text-sm text-slate-500">
                    Score:{" "}
                    <span className="font-bold text-yellow-400">
                      {score}/{TOTAL_QUESTIONS}
                    </span>
                  </p>

                  <button
                    onClick={nextQuestion}
                    disabled={selectedAnswer === null}
                    className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {currentIndex === TOTAL_QUESTIONS - 1
                      ? "See results"
                      : "Next question"}

                    <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
          <Rocket size={19} className="mt-0.5 shrink-0 text-yellow-400" />

          <p className="text-xs leading-6 text-slate-400">
            Your best score is saved in this browser using localStorage.
            Clearing browser data may erase it. The quiz can be played
            again as many times as you like.
          </p>
        </div>
      </div>
    </section>
  );
}