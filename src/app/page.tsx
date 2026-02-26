"use client";
import { useState } from "react";
import { Sparkles, Rocket, Crown, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryGrid from "@/components/CategoryGrid";
import FlashcardGrid from "@/components/FlashcardGrid";
import FlashcardModal from "@/components/FlashcardModal";
import QuizModal from "@/components/QuizModal";
import { Gamepad2 } from "lucide-react";

import categoriesData from "@/data/categories.json";
import vocabData from "@/data/vocabulary.json";

import type { Category, Vocabulary } from "@/types";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedItem, setSelectedItem] = useState<Vocabulary | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const filteredVocab = selectedCategory
    ? vocabData.filter((v: any) => v.categoryId === selectedCategory.id) as Vocabulary[]
    : [];

  return (
    <main className="min-h-screen py-8 px-4 md:px-12 max-w-7xl mx-auto flex flex-col items-center">

      {/* Header Area */}
      <header className={`flex flex-col items-center justify-center transition-all duration-500 ${selectedCategory ? 'gap-2 mb-8 mt-2' : 'gap-6 mb-16 mt-8'} relative w-full`}>

        {selectedCategory && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedCategory(null)}
            className="absolute left-0 top-1/2 -translate-y-1/2 md:-left-4 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full text-pink-500 dark:text-pink-400 font-bold shadow-sm hover:shadow-md hover:scale-105 transition-all"
          >
            <ArrowLeft size={24} /> <span className="hidden md:inline">Quay lại</span>
          </motion.button>
        )}

        <motion.div
          layout
          className="flex items-center gap-4 relative"
        >
          {!selectedCategory && (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
              <Sparkles size={64} className="text-yellow-400 drop-shadow-md hidden sm:block" />
            </motion.div>
          )}

          <div className="relative">
            <h1 className={`${selectedCategory ? 'text-4xl md:text-5xl tracking-tight' : 'text-5xl sm:text-6xl md:text-[5rem] tracking-tighter'} font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-center drop-shadow-sm py-2 px-6 transition-all`}>
              {selectedCategory ? selectedCategory.name_vi : "K I D L I N G O"}
            </h1>
            {!selectedCategory && <Crown size={32} strokeWidth={2.5} className="absolute -top-4 -right-1 text-yellow-400 rotate-12 drop-shadow-sm" fill="#facc15" />}
          </div>

          {!selectedCategory && (
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <Rocket size={64} className="text-blue-400 drop-shadow-md hidden sm:block" />
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {!selectedCategory && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex flex-col items-center gap-8 mt-4"
            >
              <div className="text-center text-lg md:text-xl font-bold bg-white/60 dark:bg-slate-800/60 backdrop-blur-md px-10 py-4 rounded-full text-slate-600 dark:text-slate-300 shadow-sm border border-white/50 dark:border-slate-700/50 uppercase tracking-widest">
                Khám phá thế giới từ vựng
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsQuizOpen(true)}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-b from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-white rounded-[2rem] font-bold text-lg lg:text-xl shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)] transition-all border-b-4 border-emerald-600 active:border-b-0 active:translate-y-1"
              >
                <Gamepad2 size={28} className="transition-transform group-hover:rotate-12" /> Làm bài trắc nghiệm nhé
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <div className="w-full flex justify-center">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full justify-center flex"
            >
              <CategoryGrid categories={categoriesData as Category[]} onSelect={setSelectedCategory} />
            </motion.div>
          ) : (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <FlashcardGrid items={filteredVocab} onSelect={setSelectedItem} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FlashcardModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      {isQuizOpen && (
        <QuizModal
          items={selectedCategory ? filteredVocab : (vocabData as Vocabulary[])}
          onClose={() => setIsQuizOpen(false)}
        />
      )}
    </main>
  );
}
