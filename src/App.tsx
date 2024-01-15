import React, {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
// import { DOMMessage, DOMMessageResponse } from "./chromeServices/types";
import Navbar from "./components/Navbar";

export type AuthToken = {
  authToken: string;
  setAuthToken: Dispatch<SetStateAction<string>>;
};
export const AuthContext = createContext<AuthToken>({
  authToken: "",
  setAuthToken: () => {},
});

const App: React.FC<{}> = () => {
  // const [title, setTitle] = useState("");
  // const [headlines, setHeadlines] = useState<string[]>([]);
  const [authToken, setAuthToken] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          // chrome.tabs.sendMessage(
          //   tabs[0].id || 0,
          //   { type: "GET_DOM" } as DOMMessage,
          //   (response: DOMMessageResponse) => {
          //     setTitle(response.title);
          //     setHeadlines(response.headlines);
          //   }
          // );
        }
      );
  }, []);

  useEffect(() => {
    if (authToken.length > 0) {
      // This method needs Chrome Sync turned on to work.
      chrome.identity?.getProfileUserInfo((userInfo) => {
        setUsername(userInfo.email);
      });
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <div className="App">
        <Navbar />
        {username.length > 0 ? (
          <div className="flex-col items-center justify-center text-base p-5">
            <div className="flex-initial">
              <span>Email: {username}</span>
            </div>
          </div>
        ) : null}
      </div>
    </AuthContext.Provider>
  );
};

export default App;
