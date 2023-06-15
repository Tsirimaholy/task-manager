import {useEffect, useState} from "react";

const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Retrieve the value from local storage
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  useEffect(() => {
    // Update local storage when the value changes
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export {
  useLocalStorage
}