import { useState } from "react";

export default function useLocalStorage(key, defaultValue) {
    const [storedValue, setStoredValue] = useState(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultValue;
    });

    const setValue = (value) => {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    return [storedValue, setValue];
}