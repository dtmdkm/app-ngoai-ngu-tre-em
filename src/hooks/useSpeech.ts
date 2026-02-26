"use client";

import { useCallback } from "react";

export const useSpeech = () => {
    const speak = useCallback((text: string, langCode: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = langCode;

            // Optional: force a slight delay to ensure voices are loaded via an interval or event if necessary,
            // but for immediate clicks, we just fetch what's available.
            const voices = window.speechSynthesis.getVoices();

            if (voices.length > 0) {
                // Determine the base language we are aiming for
                const targetBaseLang = langCode.split('-')[0];

                // Keep track of valid voices for the target language ONLY
                const validVoices = voices.filter(v => v.lang.startsWith(targetBaseLang));

                if (validVoices.length > 0) {
                    // 1. First priority: Premium online/natural voices (Google, Microsoft Online, Natural)
                    let voice = validVoices.find((v) =>
                        (v.name.includes("Google") || v.name.includes("Premium") || v.name.includes("Natural") || v.name.includes("Online"))
                    );

                    // 2. Second priority: Specific known good voices for Asian languages & Spanish on Windows/Mac
                    if (!voice && targetBaseLang === 'ja') {
                        voice = validVoices.find(v => v.name.includes("Ayumi") || v.name.includes("Ichiro") || v.name.includes("Haruka") || v.name.includes("Kyoko") || v.name.includes("Keita"));
                    }
                    if (!voice && targetBaseLang === 'ko') {
                        voice = validVoices.find(v => v.name.includes("Heami") || v.name.includes("Inja") || v.name.includes("Seoyeon") || v.name.includes("Yumi"));
                    }
                    if (!voice && targetBaseLang === 'zh') {
                        voice = validVoices.find(v => v.name.includes("Huihui") || v.name.includes("Yaoyao") || v.name.includes("Kangkang") || v.name.includes("Ting-Ting"));
                    }
                    if (!voice && targetBaseLang === 'es') {
                        voice = validVoices.find(v => v.name.includes("Helena") || v.name.includes("Laura") || v.name.includes("Pablo") || v.name.includes("Monica"));
                    }

                    // 3. Third priority: Any voice matching the exact locale (e.g., en-US)
                    if (!voice) {
                        voice = validVoices.find((v) => v.lang === langCode);
                    }

                    // 4. Fourth priority: Any voice matching the broad language code 
                    if (!voice) {
                        voice = validVoices[0]; // just grab the first valid one
                    }

                    if (voice) {
                        utterance.voice = voice;
                    }
                } else {
                    // CRITICAL FIX: If we CANNOT find a native voice for to target language (e.g. no Japanese voice installed on Windows),
                    // Do NOT let the English voice try to read it (it will sound terrible/broken).
                    // We let it try to speak without a specific voice, but relying on langCode fallback.
                }
            }

            // Fine-tuned rates: Slower for languages that usually speak fast
            if (langCode.startsWith("es")) {
                utterance.rate = 0.65; // Spanish needs to be significantly slower for kids
            } else if (["fr-FR", "ja-JP", "ko-KR", "zh-CN"].includes(langCode)) {
                utterance.rate = 0.75;
            } else {
                utterance.rate = 0.85;
            }

            // Sweet slightly high pitch for child-like friendliness
            utterance.pitch = 1.15;

            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("Speech Synthesis API is not supported in this browser.");
        }
    }, []);

    return { speak };
};
