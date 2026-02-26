"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2 } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";
import type { Vocabulary } from "@/types";

export default function FlashcardModal({ item, onClose }: { item: Vocabulary | null, onClose: () => void }) {
    const { speak } = useSpeech();

    const langStyles: Record<string, { label: string, flagCode: string, bg: string, text: string, border: string }> = {
        "en": { label: "English", flagCode: "us", bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-600 dark:text-blue-300", border: "border-blue-300 dark:border-blue-700/50" },
        "zh": { label: "中文", flagCode: "cn", bg: "bg-red-100 dark:bg-red-900/40", text: "text-red-500 dark:text-red-300", border: "border-red-300 dark:border-red-700/50" },
        "es": { label: "Español", flagCode: "es", bg: "bg-orange-100 dark:bg-orange-900/40", text: "text-orange-500 dark:text-orange-300", border: "border-orange-300 dark:border-orange-700/50" },
        "ja": { label: "日本語", flagCode: "jp", bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-600 dark:text-emerald-300", border: "border-emerald-300 dark:border-emerald-700/50" },
        "ko": { label: "한국어", flagCode: "kr", bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-600 dark:text-purple-300", border: "border-purple-300 dark:border-purple-700/50" },
        "fr": { label: "Français", flagCode: "fr", bg: "bg-pink-100 dark:bg-pink-900/40", text: "text-pink-500 dark:text-pink-300", border: "border-pink-300 dark:border-pink-700/50" },
    };

    const playSound = (text: string, langCode: string) => {
        speak(text, langCode);
    };

    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, y: 100, rotate: -3 }}
                        animate={{ scale: 1, y: 0, rotate: 0 }}
                        exit={{ scale: 0.8, y: 50, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-4xl bg-[#fdfbf7] dark:bg-slate-900 rounded-[3rem] p-6 sm:p-10 shadow-2xl dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col items-center border-[6px] border-white/90 dark:border-slate-800 overflow-hidden"
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-[#fef08a] to-[#fbcfe8] opacity-30 dark:opacity-10 rounded-t-[2.5rem] pointer-events-none"></div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/50 dark:bg-white/5 rounded-full blur-xl pointer-events-none"></div>

                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="absolute top-5 right-5 z-20 p-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full text-slate-400 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors shadow-lg border-2 border-slate-100 dark:border-slate-700"
                        >
                            <X size={32} strokeWidth={3} />
                        </motion.button>

                        <div className="relative z-10 flex flex-col items-center gap-3 mb-10 w-full mt-2">
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, type: "spring" }}
                                className="px-6 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-pink-500 dark:text-pink-400 rounded-full text-lg font-bold tracking-widest uppercase mb-2 shadow-sm border border-pink-100 dark:border-pink-900/50"
                            >
                                Từ vựng
                            </motion.div>
                            <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-slate-800 dark:text-slate-100 capitalize text-center leading-tight drop-shadow-sm px-4">
                                {item.word_vi}
                            </h2>
                        </div>

                        <div className="relative z-10 w-full grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {Object.entries(item.translations).map(([langKey, trans], index) => {
                                const style = langStyles[langKey] || { label: langKey.toUpperCase(), flagCode: "un", bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-300" };
                                return (
                                    <motion.button
                                        key={langKey}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05, type: "spring" }}
                                        whileHover={{ scale: 1.03, y: -6 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => playSound(trans.word, trans.lang_code)}
                                        className={`group flex flex-col items-center justify-center p-6 sm:p-8 ${style.bg} rounded-[2rem] shadow-sm hover:shadow-lg transition-all border-b-[6px] hover:border-b-[10px] ${style.border} active:border-b-0 active:translate-y-2 relative`}
                                    >
                                        <div className="absolute top-4 left-5 flex items-center gap-2">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={`https://flagcdn.com/${style.flagCode}.svg`} width="24" alt="flag" className="rounded-sm shadow-sm" />
                                            <span className={`text-sm sm:text-base font-black ${style.text} opacity-60 uppercase tracking-widest`}>{style.label}</span>
                                        </div>
                                        <div className="mt-6 flex flex-col items-center gap-2 w-full">
                                            <span className={`text-2xl sm:text-3xl font-black ${style.text} capitalize text-center w-full px-2 drop-shadow-sm leading-tight break-words`} style={{ wordBreak: 'break-word', hyphens: 'auto' }}>
                                                {trans.word}
                                            </span>
                                            {trans.phonetic && (
                                                <span className={`text-sm sm:text-base font-medium text-slate-500 dark:text-slate-300 bg-white/50 dark:bg-white/10 px-3 py-1 rounded-full text-center mt-1`}>
                                                    {trans.phonetic}
                                                </span>
                                            )}
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 15 }}
                                                className="mt-2 bg-white/70 dark:bg-white/10 p-4 rounded-full shadow-sm group-hover:bg-white dark:group-hover:bg-white/20 transition-colors"
                                            >
                                                <Volume2 size={36} className={`${style.text}`} strokeWidth={2.5} />
                                            </motion.div>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
