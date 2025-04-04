import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function DrawingBoard() {
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