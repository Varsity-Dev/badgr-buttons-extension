import React, { useEffect, useState } from "react";
import { DOMMessage, DOMMessageResponse } from "./chromeServices/types";
import Navbar from "./components/Navbar";

const App: React.FC<{}> = () => {
  const [title, setTitle] = useState("");
  const [headlines, setHeadlines] = useState<string[]>([]);

  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            { type: "GET_DOM" } as DOMMessage,
            (response: DOMMessageResponse) => {
              setTitle(response.title);
              setHeadlines(response.headlines);
            }
          );
        }
      );
  }, []);

  return (
    <div className="App">
      <Navbar />

      <span>Title contains {title.length} characters.</span>
      <br />
      <span>Headlines contains {headlines.length} characters.</span>
    </div>
  );
};

export default App;
