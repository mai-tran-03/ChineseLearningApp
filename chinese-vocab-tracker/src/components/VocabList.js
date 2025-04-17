import React, { useState, useEffect } from "react";
import { applyToneMarks } from "../utils/Apply";

export default function VocabList({ vocabList, saveVocabList, saveAsList }) {
    const [editedList, setEditedList] = useState(() => JSON.parse(JSON.stringify(vocabList)));
    const [isEditing, setIsEditing] = useState(false);
    const [newListName, setNewListName] = useState("");

    useEffect(() => {
        setEditedList(JSON.parse(JSON.stringify(vocabList)));
    }, [vocabList]);

    const handleInputChange = (index, field, value) => {
        const updatedList = [...editedList];
        updatedList[index][field] = field === "pinyin" ? applyToneMarks(value) : value;
        setEditedList(updatedList);
    };

    const handleSaveClick = () => {
        saveVocabList(editedList);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        // Deep copy individual vocab objects inside nested object
        setEditedList(JSON.parse(JSON.stringify(vocabList)));
        setIsEditing(false);
    };

    const handleSaveAsList = () => {
        if (!newListName.trim()) {
            return;
        }
        saveAsList(newListName, editedList);
        setNewListName("");
        setEditedList([]);
    };

    return (
        <div className="border border-gray-400 p-4 rounded-lg shadow-sm relative">
            {console.log("Rendering VocabList: editedList =", editedList, "isEditing =", isEditing)}
            <h2 className="font-bold text-lg mb-2">Vocab List</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-2 py-1">Word</th>
                        <th className="border border-gray-300 px-2 py-1">Pinyin</th>
                        <th className="border border-gray-300 px-2 py-1">Definition</th>
                        <th className="border border-gray-300 px-2 py-1">Example</th>
                    </tr>
                </thead>
                <tbody>
                    {editedList.map((vocab, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-2 py-1">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        placeholder="Ex. 一"
                                        value={vocab.word}
                                        onChange={(e) =>
                                            handleInputChange(index, "word", e.target.value)
                                        }
                                        className="w-full px-1 py-1"
                                    />
                                ) : (
                                    vocab.word
                                )}
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        placeholder="Ex. yi1"
                                        value={vocab.pinyin}
                                        onChange={(e) =>
                                            handleInputChange(index, "pinyin", e.target.value)
                                        }
                                        className="w-full px-1 py-1"
                                    />
                                ) : (
                                    vocab.pinyin
                                )}
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        placeholder="Ex. One"
                                        value={vocab.definition}
                                        onChange={(e) =>
                                            handleInputChange(index, "definition", e.target.value)
                                        }
                                        className="w-full px-1 py-1"
                                    />
                                ) : (
                                    vocab.definition
                                )}
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        placeholder="Ex. 〇一二三四五六七八九"
                                        value={vocab.example}
                                        onChange={(e) =>
                                            handleInputChange(index, "example", e.target.value)
                                        }
                                        className="w-full px-1 py-1"
                                    />
                                ) : (
                                    vocab.example
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isEditing ? (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                        onClick={handleSaveClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={handleCancelClick}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
                >
                    Edit List
                </button>
            )}
            <div className="mt-4 flex gap-2 items-center">
                <input
                type="text"
                placeholder="Enter list name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="border px-2 py-1"
                />
                <button
                onClick={handleSaveAsList}
                className="bg-green-600 text-white px-4 py-1 rounded"
                >
                Save as List
                </button>
            </div>
        </div>
    );
}