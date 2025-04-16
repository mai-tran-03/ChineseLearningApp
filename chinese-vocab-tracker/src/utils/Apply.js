export const applyToneMarks = (input) => {
    const pinyinTones = {
        a: ['ā', 'á', 'ǎ', 'à'],
        e: ['ē', 'é', 'ě', 'è'],
        i: ['ī', 'í', 'ǐ', 'ì'],
        o: ['ō', 'ó', 'ǒ', 'ò'],
        u: ['ū', 'ú', 'ǔ', 'ù'],
        ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ']
    };
    const processedInput = input.replace(/v/g, 'ü');

    return processedInput.replace(/([a-zü]+)([1-4])/gi, (match, syllable, toneNum) => {
        const tone = parseInt(toneNum) - 1;
        const lower = syllable.toLowerCase();
        let index = -1;

        if (lower.includes('a')) {
            index = lower.indexOf('a');
        } else if (lower.includes('e')) {
            index = lower.indexOf('e');
        } else if (lower.includes('ou')) {
            index = lower.indexOf('o');
        } else {
            for (let i = syllable.length - 1; i >= 0; i--) {
                if ('aeiouü'.includes(lower[i])) {
                    index = i;
                    break;
                }
            }
        }

        if (index !== -1) {
            const targetVowel = lower[index];
            const markedVowel = pinyinTones[targetVowel]?.[tone] || targetVowel;
            return syllable.slice(0, index) + markedVowel + syllable.slice(index + 1);
        }

        return syllable;
    });
};