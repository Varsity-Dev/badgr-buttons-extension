import React, {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { DOMMessage, DOMMessageResponse } from "./chromeServices/types";
import Navbar from "./components/Navbar";

export type GlobalContext = {
  authToken: string;
  setAuthToken: Dispatch<SetStateAction<string>>;
};
export const AuthContext = createContext<GlobalContext>({
  authToken: "",
  setAuthToken: () => {},
});

const App: React.FC<{}> = () => {
  const [title, setTitle] = useState("");
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [authToken, setAuthToken] = useState("");

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
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <div className="App">
        <Navbar />

        <span>Title contains {title.length} characters.</span>
        <br />
        <span>Headlines contains {headlines.length} characters.</span>
        <br />
        <span>Token: {authToken}</span>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
