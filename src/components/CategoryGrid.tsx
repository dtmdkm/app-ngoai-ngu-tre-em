"use client";
import { motion } from "framer-motion";
import type { Category } from "@/types";

export default function CategoryGrid({ categories, onSelect }: { categories: Category[], onSelect: (c: Category) => void }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl px-4">
            {categories.map((cat, index) => {
                return (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", delay: index * 0.1 }}
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onSelect(cat)}
                        className={`group relative flex flex-col items-center justify-center p-8 rounded-[2rem] shadow-sm hover:shadow-xl cursor-pointer transition-all border-[3px] border-white/60 dark:border-white/5 overflow-hidden ${cat.color}`}
                    >
                        {/* Glossy overlay */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/40 dark:bg-black/10 rounded-t-[2.5rem]"></div>

                        <motion.div
                            className="relative z-10 mb-6 bg-white/90 dark:bg-white/20 p-4 sm:p-6 rounded-[2rem] shadow-sm transform transition-transform"
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-6xl md:text-7xl drop-shadow-md block leading-none">{cat.emoji}</span>
                        </motion.div>

                        <h2 className="relative z-10 text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                            {cat.name_vi}
                        </h2>

                        {/* Decorative circles */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
                        <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/30 rounded-full blur-lg pointer-events-none"></div>
                    </motion.div>
                );
            })}
        </div>
    );
}
