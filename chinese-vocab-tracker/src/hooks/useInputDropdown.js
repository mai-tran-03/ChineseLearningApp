import { useState, useRef, useEffect } from "react";

export default function useInputDropdown(recentItems) {
    const [show, setShow] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const [value, setValue] = useState('');

    const width = useRef(0);

    useEffect(() => {
        if (inputRef.current) {
        width.current = inputRef.current.offsetWidth;
        }
    }, []);

    const handleBlur = () => {
        setTimeout(() => {
        const {activeElement} = document;
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(activeElement) &&
            inputRef.current &&
            activeElement !== inputRef.current
        ) {
            setShow(false);
        }
        }, 0);
    };

    return {
        value,
        setValue,
        inputRef,
        dropdownRef,
        show,
        setShow,
        width: width.current,
        handleBlur,
        items: recentItems,
    };
}