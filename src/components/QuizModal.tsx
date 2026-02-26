"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, Trophy, ArrowRight, RefreshCw, Star } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";
import type { Vocabulary } from "@/types";

export default function QuizModal({
    items,
    onClose
}: {
    items: Vocabulary[],
    onClose: () => void
}) {
    const { speak } = useSpeech();
    const [questionWord, setQuestionWord] = useState<Vocabulary | null>(null);
    const [options, setOptions] = useState<Vocabulary[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);

    const generateQuestion = () => {
        if (items.length < 4) return;

        // Pick a random target word
        const targetIndex = Math.floor(Math.random() * items.length);
        const target = items[targetIndex];

        // Pick 3 random distractors
        const distractors = items.filter(v => v.id !== target.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        // Combine and shuffle options
        const allOptions = [target, ...distractors].sort(() => 0.5 - Math.random());

        setQuestionWord(target);
        setOptions(allOptions);
        setSelectedId(null);
        setIsCorrect(null);

        // Automatically play the sound of the english word
        setTimeout(() => speak(target.translations.en.word, "en-US"), 500);
    };

    useEffect(() => {
        generateQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    const handleSelect = (option: Vocabulary) => {
        if (isCorrect !== null) return; // Prevent clicking after selection before next question

        setSelectedId(option.id);
        if (option.id === questionWord?.id) {
            setIsCorrect(true);
            setScore(s => s + 1);
            // Play a success sound
        } else {
            setIsCorrect(false);
            // Could play error sound
        }
    };

    if (!questionWord) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-slate-950/90 backdrop-blur-md"
            >
                <motion.div
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 50, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="relative w-full max-w-4xl bg-[#fdfbf7] dark:bg-slate-900 rounded-3xl sm:rounded-[3rem] p-4 sm:p-8 lg:p-10 shadow-2xl flex flex-col items-center border-[4px] sm:border-[8px] border-white/90 dark:border-slate-800 overflow-hidden min-h-[400px] sm:min-h-[500px]"
                >
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 p-2 sm:p-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full text-slate-400 dark:text-slate-300 hover:text-rose-500 transition-colors shadow-sm"
                    >
                        <X className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3} />
                    </motion.button>

                    {/* Score display */}
                    <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-1 sm:gap-2 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-black text-lg sm:text-xl border sm:border-2 border-yellow-300 dark:border-yellow-700/50">
                        <Trophy className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" /> {score}
                    </div>

                    {/* The Question */}
                    <div className="mt-8 sm:mt-8 mb-6 sm:mb-12 flex flex-col items-center gap-2 sm:gap-4">
                        <span className="text-base sm:text-xl font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">Từ này là gì nhỉ?</span>
                        <div className="flex items-center gap-3 sm:gap-4">
                            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-blue-600 dark:text-blue-400 capitalize drop-shadow-sm">
                                {questionWord.translations.en.word}
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => speak(questionWord.translations.en.word, "en-US")}
                                className="bg-blue-100 dark:bg-blue-900/50 p-2 sm:p-4 rounded-full text-blue-500 hover:bg-blue-200 transition-colors"
                            >
                                <Volume2 className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3} />
                            </motion.button>
                        </div>
                        <span className="text-sm sm:text-lg text-slate-400 font-medium tracking-wide">/{questionWord.translations.en.phonetic}/</span>
                    </div>

                    {/* The Choices Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 w-full max-w-2xl px-1 sm:px-2">
                        {options.map((opt, i) => {
                            const isSelected = selectedId === opt.id;
                            const isTarget = opt.id === questionWord.id;

                            let btnClass = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg";

                            if (isCorrect !== null) {
                                if (isTarget) {
                                    btnClass = "bg-green-100 dark:bg-green-900/40 border-green-500 dark:border-green-600 text-green-700 dark:text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)] z-10";
                                } else if (isSelected && !isTarget) {
                                    btnClass = "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800 text-red-400 dark:text-red-500 opacity-60";
                                } else {
                                    btnClass = "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-800 opacity-40";
                                }
                            }

                            return (
                                <motion.button
                                    key={opt.id}
                                    whileHover={isCorrect === null ? { scale: 1.05, y: -5 } : {}}
                                    whileTap={isCorrect === null ? { scale: 0.95 } : {}}
                                    animate={
                                        isCorrect === false && isSelected
                                            ? { x: [-10, 10, -10, 10, 0] }
                                            : isCorrect === true && isTarget
                                                ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }
                                                : {}
                                    }
                                    transition={{ duration: 0.4 }}
                                    onClick={() => handleSelect(opt)}
                                    className={`relative flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 rounded-[1.5rem] sm:rounded-[2rem] border-[3px] sm:border-[4px] transition-all duration-300 ${btnClass}`}
                                >
                                    <span className="text-5xl sm:text-6xl lg:text-7xl mb-2 sm:mb-4 drop-shadow-md">{opt.emoji}</span>
                                    <span className="text-lg sm:text-xl lg:text-2xl font-black capitalize text-center px-1 leading-tight">{opt.word_vi}</span>

                                    {isCorrect === true && isTarget && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-yellow-400 p-1.5 sm:p-2 rounded-full text-white shadow-lg"
                                        >
                                            <Star className="w-5 h-5 sm:w-8 sm:h-8" fill="currentColor" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Next Question Control */}
                    <AnimatePresence>
                        {isCorrect !== null && (
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={generateQuestion}
                                className="mt-8 sm:mt-10 px-6 py-3 sm:px-8 sm:py-4 bg-pink-500 hover:bg-pink-400 text-white rounded-full font-black text-lg sm:text-xl lg:text-2xl shadow-xl flex items-center gap-2 sm:gap-3 transition-colors uppercase tracking-widest"
                            >
                                {isCorrect ? "Câu tiếp theo" : "Thử lại nào"} <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
