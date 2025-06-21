export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    console.warn(`Unable to read localStorage key “${key}”`);
    return null;
  }
};

export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`Unable to write localStorage key “${key}”`);
  }
};
