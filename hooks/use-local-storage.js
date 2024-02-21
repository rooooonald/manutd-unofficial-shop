export default function useLocalStorage(key, defaultValue) {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  };

  const [storedValue, setStoredValue] = useState(getInitialValue());

  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    const storageChangeHandler = () => {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : defaultValue);
    };

    window.addEventListener("storage", storageChangeHandler);

    return () => window.removeEventListener("storage", storageChangeHandler);
  }, [key, defaultValue]);

  return { storedValue, setValue };
}
