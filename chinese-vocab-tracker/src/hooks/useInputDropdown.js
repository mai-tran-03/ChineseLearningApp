import { useState, useRef, useEffect } from 'react';

export default function useInputDropdown(recentItems) {
    const [show, setShow] = useState(false);
    const [width, setWidth] = useState("auto");
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            setWidth(`${inputRef.current.getBoundingClientRect().width}px`);
        }
    }, [recentItems]);

    return { show, setShow, width, inputRef, dropdownRef };
}
