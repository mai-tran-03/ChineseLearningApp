export const applyToneMarks = (input) => {
    const pinyinTones = {
        a: ['ā', 'á', 'ǎ', 'à'],
        e: ['ē', 'é', 'ě', 'è'],
        i: ['ī', 'í', 'ǐ', 'ì'],
        o: ['ō', 'ó', 'ǒ', 'ò'],
        u: ['ū', 'ú', 'ǔ', 'ù'],
        ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ']
    };
    const vowelPriority = ['a', 'o', 'e', 'i', 'u', 'ü'];
    const processedInput = input.replace(/v/g, 'ü');

    return processedInput.replace(/([a-zü]+)([1-4])/gi, (match, syllable, toneNum) => {
        const tone = parseInt(toneNum) - 1;
        const lowerSyllable = syllable.toLowerCase();
        let chars = lowerSyllable.split('');

        let indexToReplace = -1;
        for (const v of vowelPriority) {
            const idx = chars.indexOf(v);
            if (idx !== -1) {
                indexToReplace = idx;
                break;
            }
        }

        if (indexToReplace !== -1) {
            const targetVowel = chars[indexToReplace];
            if (pinyinTones[targetVowel]) {
                chars[indexToReplace] = pinyinTones[targetVowel][tone];
            }
        }
        return chars.join('');
    });
};