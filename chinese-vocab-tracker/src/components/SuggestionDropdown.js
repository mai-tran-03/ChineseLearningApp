export default function SuggestionDropdown({
    show,
    items,
    inputValue,
    onSelect,
    dropdownRef,
    width,
}) {
    const filtered = items.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (!show || filtered.length === 0) {
        return null;
    }

    return (
        <ul
            ref={dropdownRef}
            className="absolute bg-black text-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto z-10"
            style={{ width }}
        >
            {filtered.map((item, index) => (
                <li
                    key={index}
                    onClick={() => onSelect(item)}
                    className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
                >
                    {item}
                </li>
            ))}
        </ul>
    );
}
