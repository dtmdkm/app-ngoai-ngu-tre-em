export interface Category {
    id: string;
    name_vi: string;
    emoji: string;
    color: string;
}

export interface Vocabulary {
    id: number;
    categoryId: string;
    word_vi: string;
    emoji: string;
    translations: {
        [key: string]: {
            word: string;
            phonetic?: string;
            lang_code: string;
        }
    };
}
