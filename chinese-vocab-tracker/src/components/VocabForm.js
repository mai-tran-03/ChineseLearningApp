import React from "react";
import SuggestionDropdown from "./SuggestionDropdown";
import useInputDropdown from "../hooks/useInputDropdown";
import { applyToneMarks } from "../utils/Apply";

function InputWithDropdown({ dropdown, placeholder, applyValue }) {
    return (
    <div className="relative">
        <input
            type="text"
            placeholder={placeholder}
            value={dropdown.value}
            onChange={(e) => dropdown.setValue(applyValue ? applyValue(e.target.value) : e.target.value)}
            onFocus={() => dropdown.setShow(true)}
            onBlur={dropdown.handleBlur}
            className="w-full px-1 py-1"
            ref={dropdown.inputRef}
        />
        <SuggestionDropdown
            show={dropdown.show}
            items={dropdown.items}
            inputValue={dropdown.value}
            onSelect={(value) => {
                dropdown.setValue(value);
                setTimeout(() => dropdown.setShow(false), 0);
            }}
            dropdownRef={dropdown.dropdownRef}
            width={dropdown.width}
        />
    </div>
    );
}

export default function VocabForm({ addVocab, recentWords, recentPinyins, recentDefinitions, recentExamples }) {
    const wordDropdown = useInputDropdown(recentWords);
    const pinyinDropdown = useInputDropdown(recentPinyins);
    const definitionDropdown = useInputDropdown(recentDefinitions);
    const exampleDropdown = useInputDropdown(recentExamples);

    const handleSubmit = (e) => {
        e.preventDefault();
        const vocab = { 
            word: wordDropdown.value, 
            pinyin: pinyinDropdown.value, 
            definition: definitionDropdown.value, 
            example: exampleDropdown.value 
        };
        addVocab(vocab);
        wordDropdown.setValue('');
        pinyinDropdown.setValue('');
        definitionDropdown.setValue('');
        exampleDropdown.setValue('');
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
                                <InputWithDropdown 
                                    dropdown={wordDropdown}
                                    placeholder="Ex. 一"
                                />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                <InputWithDropdown 
                                    dropdown={pinyinDropdown}
                                    placeholder="Ex. yi1"
                                    applyValue={applyToneMarks}
                                />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                <InputWithDropdown 
                                    dropdown={definitionDropdown}
                                    placeholder="Ex. one"
                                />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                <InputWithDropdown 
                                    dropdown={exampleDropdown}
                                    placeholder="Ex. 〇一二三四五六七八九"
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