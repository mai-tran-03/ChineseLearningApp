export const updateRecentItems = (newItem, existingItems, key, limit = 5) => {
    // Remove any duplicates and ensure the list is no longer than 'limit'
    const deduped = existingItems.filter((item) => item !== newItem);
    const updated = [newItem, ...deduped].slice(0, limit);
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
};