import React, { useState } from "react";

export default function CollapsibleList({ title, vocabList }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border rounded shadow mb-4">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left px-4 py-2 bg-gray-200 font-bold"
        >
            {isOpen ? "▼" : "▶"} {title}
        </button>

        {isOpen && (
            <table className="w-full border-t">
            <thead>
                <tr>
                <th className="border px-2 py-1">Word</th>
                <th className="border px-2 py-1">Pinyin</th>
                <th className="border px-2 py-1">Definition</th>
                <th className="border px-2 py-1">Example</th>
                </tr>
            </thead>
            <tbody>
                {vocabList.map((vocab, i) => (
                <tr key={i}>
                    <td className="border px-2 py-1">{vocab.word}</td>
                    <td className="border px-2 py-1">{vocab.pinyin}</td>
                    <td className="border px-2 py-1">{vocab.definition}</td>
                    <td className="border px-2 py-1">{vocab.example}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
}
