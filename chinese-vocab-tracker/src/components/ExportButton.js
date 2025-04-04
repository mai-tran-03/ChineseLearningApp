import React from "react";

export default function ExportButton({ vocabList, exportToCSV }) {
    return (
        <div className="p-4">
        <button
            onClick={() => exportToCSV(vocabList)}
            className="bg-green-500 text-white px-4 py-2 rounded"
        >
            Export to CSV
        </button>
        </div>
    );
}