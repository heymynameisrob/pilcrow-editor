import { useState, useEffect, Dispatch, SetStateAction } from "react";

type UseLocalStorageReturnType<T> = [T, Dispatch<SetStateAction<T>>];

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorageReturnType<T> {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  const setValue: Dispatch<SetStateAction<any>> = (value) => {
    setStoredValue(value);

    if (typeof value === "string") {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  return [storedValue, setValue];
}
