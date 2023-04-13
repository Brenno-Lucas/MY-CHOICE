export const saveItem = (key, item) => localStorage.setItem(key, JSON.stringify(item));

export const getItem = (key) => JSON.parse(localStorage.getItem(key));

export const clearUser = () => localStorage.clear();
