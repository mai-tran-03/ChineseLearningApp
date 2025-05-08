import React from "react";
import VocabForm from "./components/VocabForm";
import DrawingBoard from "./components/DrawingBoard";
import VocabList from "./components/VocabList";
import ExportButton from "./components/ExportButton";
import exportToCSV from "./utils/Export";
import { updateRecentItems } from "./utils/Storage";
import CollapsibleList from "./components/CollapsibleList";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [vocabList, setVocabList] = useLocalStorage("vocabList", []);
  const [namedLists, setNamedLists] = useLocalStorage("namedLists", {});
  const [recentWords, setRecentWords] = useLocalStorage("recentWords", []);
  const [recentPinyins, setRecentPinyins] = useLocalStorage("recentPinyins", []);
  const [recentDefinitions, setRecentDefinitions] = useLocalStorage("recentDefinitions", []);
  const [recentExamples, setRecentExamples] = useLocalStorage("recentExamples", []);

  const addVocab = (vocab) => {
    const updatedList = [...vocabList, vocab];
    setVocabList(updatedList);

    setRecentWords(updateRecentItems(vocab.word, recentWords, 'recentWords'));
    setRecentPinyins(updateRecentItems(vocab.pinyin, recentPinyins, 'recentPinyins'));
    setRecentDefinitions(updateRecentItems(vocab.definition, recentDefinitions, 'recentDefinitions'));
    setRecentExamples(updateRecentItems(vocab.example, recentExamples, 'recentExamples'));
  };

  const saveVocabList = (newList) => {
    setVocabList(newList);
    localStorage.setItem("vocabList", JSON.stringify(newList));
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
        saveVocabList={saveVocabList}
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
