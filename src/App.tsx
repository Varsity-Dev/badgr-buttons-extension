import React, {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { DOMMessage, DOMMessageResponse } from "./chromeServices/types";
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
  const [badgeId, setBadgeId] = useState("");
  const [badgeTitle, setBadgeTitle] = useState("");
  const [badgeDescription, setBadgeDescription] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
        },
        (tabs) => {
          const badgeURL = tabs[0].url as string;
          const matches = badgeURL.match(/\w+$/);
          const badgeId = matches && matches.length > 0 ? matches[0] : "";
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            { type: "GET_DOM" } as DOMMessage,
            (response: DOMMessageResponse) => {
              setBadgeTitle(response.badgeTitle);
              setBadgeDescription(response.badgeDescription);
              setBadgeId(badgeId);
            }
          );
        }
      );
  }, []);

  useEffect(() => {
    if (authToken.length > 0) {
      // This method (getProfileUserInfo) needs Chrome Sync turned on to work.
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
        <div className="flex-col w-full p-4">
          <div className="flex-initial">
            <span>Badge ID: {badgeId ? badgeId : "Not Found"}</span>
          </div>
          <div className="flex-initial">
            <span>Badge Title: {badgeTitle ? badgeTitle : "Not Found"}</span>
          </div>
          <div className="flex-initial">
            <span>
              Badge Description:
              {badgeDescription ? badgeDescription : "Not Found"}
            </span>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
