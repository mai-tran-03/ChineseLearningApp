import React, { useState, useEffect, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const applyToneMarks = (input) => {
  const pinyinTones = {
    a: ['ā', 'á', 'ǎ', 'à'],
    e: ['ē', 'é', 'ě', 'è'],
    i: ['ī', 'í', 'ǐ', 'ì'],
    o: ['ō', 'ó', 'ǒ', 'ò'],
    u: ['ū', 'ú', 'ǔ', 'ù'],
    ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ']
  };
  const vowelPriority = ['a', 'o', 'e', 'i', 'u', 'ü'];
  input = input.replace(/v/g, 'ü');

  return input.replace(/([a-zü]+)([1-4])/gi, (match, syllable, toneNum) => {
    const tone = parseInt(toneNum) - 1;
    const lowerSyllable = syllable.toLowerCase();
    let chars = lowerSyllable.split('');

    // Determine which vowel to put tone on, priority: a > o > e > others
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

function VocabForm({ addVocab, editVocab, currentVocab }) {
  const [word, setWord] = useState(currentVocab ? currentVocab.word : '');
  const [pinyin, setPinyin] = useState(currentVocab ? currentVocab.pinyin : '');
  const [definition, setDefinition] = useState(currentVocab ? currentVocab.definition : '');
  const [example, setExample] = useState(currentVocab ? currentVocab.example : '');
  // const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // const [recentWords, setRecentWords] = useState(() => {
  //   const savedWords = localStorage.getItem('recentWords');
  //   return savedWords ? JSON.parse(savedWords) : [];
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    const vocab = { word, pinyin, definition, example };
    if (currentVocab) {
      editVocab(vocab); // Edit existing vocab
    } else {
      addVocab(vocab); // Add new vocab

      // const updatedRecentWords = [word, ...recentWords].slice(0, 5); // Limit to 5 recent words
      // setRecentWords(updatedRecentWords);
      // localStorage.setItem('recentWords', JSON.stringify(updatedRecentWords));
    }
    setWord('');
    setPinyin('');
    setDefinition('');
    setExample('');
    // setFilteredSuggestions([]); // Clear suggestions after submission
  };

  // const handleWordChange = (e) => {
  //   const query = e.target.value;
  //   setWord(query);
  //   if (query) {
  //     // Filter recent words based on the query
  //     const suggestions = recentWords.filter((recentWord) =>
  //       recentWord.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setFilteredSuggestions(suggestions);
  //   } else {
  //     setFilteredSuggestions([]);
  //   }
  // };

  // const handleSuggestionClick = (suggestion) => {
  //   const vocab = vocabList.find((vocab) => vocab.word === suggestion);
  //   if (vocab) {
  //     setWord(vocab.word);
  //     setPinyin(vocab.pinyin);
  //     setDefinition(vocab.definition);
  //     setExample(vocab.example);
  //     setFilteredSuggestions([]);
  //   }
  // };

  useEffect(() => {
    if (currentVocab) {
      setWord(currentVocab.word);
      setPinyin(currentVocab.pinyin);
      setDefinition(currentVocab.definition);
      setExample(currentVocab.example);
    }
  }, [currentVocab]);

  return (
    // <div>
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="border border-gray-400 p-4 rounded-lg shadow-sm">
      <input
        type="text"
        placeholder="Word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="border px-2 py-1 mb-2 w-full"
      />
      {/* {filteredSuggestions.length > 0 && (
        <ul className="border border-gray-300 mt-1 w-full bg-white">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )} */}
      <input
        type="text"
        placeholder="Pinyin"
        value={pinyin}
        onChange={(e) => setPinyin(applyToneMarks(e.target.value))}
        className="border px-2 py-1 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Definition"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
        className="border px-2 py-1 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Example"
        value={example}
        onChange={(e) => setExample(e.target.value)}
        className="border px-2 py-1 mb-4 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {currentVocab ? 'Edit Vocabulary' : 'Add Vocabulary'}
      </button>
      </div>
    </form>

  //   {/* <div className="mt-4">
  //   <h3 className="font-semibold">Recently Typed Words</h3>
  //   <ul>
  //     {recentWords.map((word, index) => (
  //       <li key={index} className="text-gray-700">{word}</li>
  //     ))}
  //   </ul>
  //   </div> */}
  // {/* </div> */}
  );
}

function DrawingBoard() {
  const ref = useRef();
  const clear = () => ref.current.clear();

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-2">Character Writing Practice</h2>
      <SignatureCanvas
        penColor="black"
        canvasProps={{ width: 300, height: 300, className: "border rounded" }}
        ref={ref}
      />
      <button onClick={clear} className="mt-2 bg-gray-300 p-2 rounded">Clear</button>
    </div>
  );
}

function VocabList({ vocabList, deleteVocab, editVocab }) {
  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-2">Vocabulary List</h2>
      <ul>
      {vocabList.map((vocab, index) => (
        <li key={index} className="mb-2">
          <strong>{vocab.word}</strong> ({vocab.pinyin}) - {vocab.definition} <br />
          <i>{vocab.example}</i>
          <button
            onClick={() => editVocab(vocab)} // Edit button for whole list
            className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
          >
            Edit
          </button>
          <button
            onClick={() => deleteVocab(vocab.word)} // Delete button
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
    </div>
  );
}

function downloadCSV(vocabList) {
  // Convert vocabList to CSV with UTF-8 encoding
  const csvContent =
    "data:text/csv;charset=utf-8," +
    vocabList
      .map(({ word, pinyin, definition, example }) =>
        [word, pinyin, definition, example].join(",")
      )
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "chinese_vocab.csv");
  
  // Append the link to the document, click to download, and remove the link
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function App() {
  // Retrieve vocab list from localStorage when the app loads
  const [vocabList, setVocabList] = useState(() => {
    const savedVocabList = localStorage.getItem('vocabList');
    return savedVocabList ? JSON.parse(savedVocabList) : [];
  });

  const [currentVocab, setCurrentVocab] = useState(null);
  const [recentWords, setRecentWords] = useState(() => {
    const savedRecentWords = localStorage.getItem('recentWords');
    return savedRecentWords ? JSON.parse(savedRecentWords) : [];
  });

  const addVocab = (vocab) => {
    const updatedList = [...vocabList, vocab];
    setVocabList(updatedList);
    localStorage.setItem('vocabList', JSON.stringify(updatedList));

    // Add the word to recent words list
    const updatedRecentWords = [vocab.word, ...recentWords].slice(0, 5); // Limit to 5 recent words
    setRecentWords(updatedRecentWords);
    localStorage.setItem('recentWords', JSON.stringify(updatedRecentWords));
  };

  const deleteVocab = (word) => {
    const updatedList = vocabList.filter((vocab) => vocab.word !== word);
    setVocabList(updatedList);
    localStorage.setItem('vocabList', JSON.stringify(updatedList));
  };

  const editVocab = (updatedVocab) => {
    const updatedList = vocabList.map((vocab) =>
      vocab.word === updatedVocab.word ? updatedVocab : vocab
    );
    setVocabList(updatedList);
    setCurrentVocab(null);
    localStorage.setItem('vocabList', JSON.stringify(updatedList));
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-center mb-4">Chinese Vocab Tracker</h1>
      <VocabForm 
        addVocab={addVocab}
        editVocab={editVocab}
        currentVocab={currentVocab}
      />
      <DrawingBoard />
      <VocabList vocabList={vocabList} deleteVocab={deleteVocab} editVocab={setCurrentVocab} />
      <div className="p-4">
        <button
          onClick={() => downloadCSV(vocabList)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
}
