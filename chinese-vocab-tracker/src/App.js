import React, { useState } from "react";
import VocabForm from "./components/VocabForm";
import DrawingBoard from "./components/DrawingBoard";
import VocabList from "./components/VocabList";
import ExportButton from "./components/ExportButton";
import exportToCSV from "./utils/Export";
import { updateRecentItems } from "./utils/Storage";
import CollapsibleList from "./components/CollapsibleList";

export default function App() {
  // Retrieve vocab list from localStorage when the app loads
  const [vocabList, setVocabList] = useState(() => {
    const savedVocabList = localStorage.getItem('vocabList');
    return savedVocabList ? JSON.parse(savedVocabList) : [];
  });

  const [namedLists, setNamedLists] = useState(() => {
    const saved = localStorage.getItem("namedLists");
    return saved ? JSON.parse(saved) : {};
  });

  const [recentWords, setRecentWords] = useState(() => {
    const savedRecentWords = localStorage.getItem('recentWords');
    return savedRecentWords ? JSON.parse(savedRecentWords) : [];
  });

  const [recentPinyins, setRecentPinyins] = useState(() => {
    const savedRecentPinyins = localStorage.getItem('recentPinyins');
    return savedRecentPinyins ? JSON.parse(savedRecentPinyins) : [];
  });

  const [recentDefinitions, setRecentDefinitions] = useState(() => {
    const savedRecentDefinitions = localStorage.getItem('recentDefinitions');
    return savedRecentDefinitions ? JSON.parse(savedRecentDefinitions) : [];
  });

  const [recentExamples, setRecentExamples] = useState(() => {
    const savedRecentExamples = localStorage.getItem('recentExamples');
    return savedRecentExamples ? JSON.parse(savedRecentExamples) : [];
  });

  const addVocab = (vocab) => {
    const updatedList = [...vocabList, vocab];
    setVocabList(updatedList);
    localStorage.setItem('vocabList', JSON.stringify(updatedList));

    setRecentWords(updateRecentItems(vocab.word, recentWords, 'recentWords'));
    setRecentPinyins(updateRecentItems(vocab.pinyin, recentPinyins, 'recentPinyins'));
    setRecentDefinitions(updateRecentItems(vocab.definition, recentDefinitions, 'recentDefinitions'));
    setRecentExamples(updateRecentItems(vocab.example, recentExamples, 'recentExamples'));
  };

  const saveAsList = (name, list) => {
    const updatedNamedLists = { ...namedLists, [name]: list };
    setNamedLists(updatedNamedLists);
    setVocabList([]);
    localStorage.setItem("namedLists", JSON.stringify(updatedNamedLists));
    localStorage.setItem("vocabList", "[]");
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-center mb-4">Chinese Vocab Tracker</h1>
      <VocabForm
        addVocab={addVocab}
        recentWords={recentWords}
        recentPinyins={recentPinyins}
        recentDefinitions={recentDefinitions}
        recentExamples={recentExamples}
      />
      <DrawingBoard />
      <VocabList
        vocabList={vocabList}
        saveAsList={saveAsList}
      />
      <div className="mt-8">
        {Object.entries(namedLists).map(([name, list]) => (
          <CollapsibleList key={name} title={name} vocabList={list} />
        ))}
      </div>
      <ExportButton vocabList={vocabList} exportToCSV={exportToCSV} />
    </div>
  );
}
