export default function exportToCSV(vocabList) {
    const header = "Word,Pinyin,Definition,Example";
    // Add BOM to ensure proper encoding for Chinese characters
    const bom = "\uFEFF";
    // Convert vocabList to CSV with UTF-8 encoding
    const csvContent =
        bom +
        [header, ...vocabList
        .map(({ word, pinyin, definition, example }) =>
            [word, pinyin, definition, example].join(",")
        )]
        .join("\n");

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "chinese_vocab.csv");
    
    // Append the link to the document, click to download, and remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}