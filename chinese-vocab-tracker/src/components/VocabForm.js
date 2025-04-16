import React, { useState } from "react";
import SuggestionDropdown from "./SuggestionDropdown";
import useInputDropdown from "../hooks/useInputDropdown";
import { applyToneMarks } from "../utils/Apply";

export default function VocabForm({ addVocab, recentWords, recentPinyins, recentDefinitions, recentExamples }) {
    const [word, setWord] = useState('');
    const [pinyin, setPinyin] = useState('');
    const [definition, setDefinition] = useState('');
    const [example, setExample] = useState('');

    const wordDropdown = useInputDropdown(recentWords);
    const pinyinDropdown = useInputDropdown(recentPinyins);
    const definitionDropdown = useInputDropdown(recentDefinitions);
    const exampleDropdown = useInputDropdown(recentExamples);

    const handleSubmit = (e) => {
        e.preventDefault();
        const vocab = { word, pinyin, definition, example };
        addVocab(vocab);
        setWord('');
        setPinyin('');
        setDefinition('');
        setExample('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="border border-gray-400 p-4 rounded-lg shadow-sm">
                <div>
                <h2 className="font-bold text-lg mb-2">New Vocab</h2>
                </div>
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-2 py-1">Word</th>
                            <th className="border border-gray-300 px-2 py-1">Pinyin</th>
                            <th className="border border-gray-300 px-2 py-1">Definition</th>
                            <th className="border border-gray-300 px-2 py-1">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-2 py-1">
                                <input
                                    type="text"
                                    placeholder="Ex. 一"
                                    value={word}
                                    onChange={(e) => setWord(e.target.value)}
                                    onFocus={() => wordDropdown.setShow(true)}
                                    onBlur={() => setTimeout(() => wordDropdown.setShow(false), 100)}
                                    className="w-full px-1 py-1"
                                    ref={wordDropdown.inputRef}
                                />
                                <SuggestionDropdown
                                    show={wordDropdown.show}
                                    items={recentWords}
                                    inputValue={word}
                                    onSelect={(value) => setWord(value)}
                                    dropdownRef={wordDropdown.dropdownRef}
                                    width={wordDropdown.width}
                                />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                <input
                                    type="text"
                                    placeholder="Ex. yi1"
                                    value={pinyin}
                                    onChange={(e) => setPinyin(applyToneMarks(e.target.value))}
                                    onFocus={() => pinyinDropdown.setShow(true)}
                                    onBlur={() => setTimeout(() => pinyinDropdown.setShow(false), 100)}
                                    className="w-full px-1 py-1"
                                />
                                <SuggestionDropdown
                                    show={pinyinDropdown.show}
                                    items={recentPinyins}
                                    inputValue={pinyin}
                                    onSelect={(value) => setPinyin(value)}
                                    dropdownRef={pinyinDropdown.dropdownRef}
                                    width={pinyinDropdown.width}
                                />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                <input
                                    type="text"
                                    placeholder="Ex. one"
                                    value={definition}
                                    onChange={(e) => setDefinition(e.target.value)}
                                    onFocus={() => definitionDropdown.setShow(true)}
                                    onBlur={() => setTimeout(() => definitionDropdown.setShow(false), 100)}
                                    className="w-full px-1 py-1"
                                />
                                <SuggestionDropdown
                                    show={definitionDropdown.show}
                                    items={recentDefinitions}
                                    inputValue={definition}
                                    onSelect={(value) => setDefinition(value)}
                                    dropdownRef={definitionDropdown.dropdownRef}
                                    width={definitionDropdown.width}
                                />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                <input
                                    type="text"
                                    placeholder="Ex. 〇一二三四五六七八九"
                                    value={example}
                                    onChange={(e) => setExample(e.target.value)}
                                    onFocus={() => exampleDropdown.setShow(true)}
                                    onBlur={() => setTimeout(() => exampleDropdown.setShow(false), 100)}
                                    className="w-full px-1 py-1"
                                />
                                <SuggestionDropdown
                                    show={exampleDropdown.show}
                                    items={recentExamples}
                                    inputValue={example}
                                    onSelect={(value) => setExample(value)}
                                    dropdownRef={exampleDropdown.dropdownRef}
                                    width={exampleDropdown.width}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Vocabulary
                </button>
            </div>
        </form>
    );
}