import { useEffect, useState } from "react";

export const useChromeStorage = (
  key: string,
  initialValue: string | number
) => {
  const [value, setValue] = useState(() => {
    let item: any;
    chrome.storage.session.get([key]).then((result) => {
      item = result;
    });
    if (item != null) return item;
    return initialValue;
  });

  useEffect(() => {
    chrome.storage.session.set({ key: value }).then(() => {});
  }, [key, value]);

  return [value, setValue];
};

// Save it using the Chrome extension storage API.
export const saveOnChromeStorage = (key: string, value: string) => {
  chrome.storage.sync.set({ [key]: value }).then(() => {
    console.log("Saved on sync chrome.storage");
  });
};

// Read it using the storage API
export const getFromChromeStorage = (key: string) => {
  let result: any;
  chrome.storage.sync.get([key]).then((items) => {
    result = items[key];
    console.log(items);
  });
  return result;
};
