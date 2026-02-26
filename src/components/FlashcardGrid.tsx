"use client";
import { motion } from "framer-motion";
import type { Vocabulary } from "@/types";

export default function FlashcardGrid({ items, onSelect }: { items: Vocabulary[], onSelect: (v: Vocabulary) => void }) {
    const styles = [
        { bg: "bg-yellow-200", border: "border-yellow-400" },
        { bg: "bg-emerald-200", border: "border-emerald-400" },
        { bg: "bg-pink-200", border: "border-pink-400" },
        { bg: "bg-blue-200", border: "border-blue-400" },
        { bg: "bg-amber-200", border: "border-amber-400" },
        { bg: "bg-purple-200", border: "border-purple-400" }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 p-1 sm:p-2 pb-12">
            {items.map((item, index) => {
                const style = styles[index % styles.length];
                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 3 : -3, y: -8 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(item)}
                        className={`flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 rounded-3xl sm:rounded-[2.5rem] shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.15)] cursor-pointer transition-all duration-300 border-[3px] border-white/60 dark:border-white/5 ${style.bg} relative overflow-hidden group min-h-[160px] sm:min-h-[200px] lg:min-h-[260px]`}
                    >
                        {/* Glossy overlay effect for premium feel */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 dark:bg-black/10 rounded-t-[2rem]"></div>

                        <motion.div
                            className="mb-4 sm:mb-8 bg-white/90 dark:bg-white/20 p-3 sm:p-4 lg:p-5 rounded-2xl sm:rounded-[2rem] shadow-sm transform transition-transform z-10"
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        >
                            <span className="text-4xl sm:text-5xl lg:text-[5rem] drop-shadow-md block leading-none">{item.emoji}</span>
                        </motion.div>

                        <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 capitalize text-center leading-tight z-10 drop-shadow-sm group-hover:text-slate-900 dark:group-hover:text-white transition-colors px-1">
                            {item.word_vi}
                        </h2>
                    </motion.div>
                );
            })}
        </div>
    );
}
