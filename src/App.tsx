import React, {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Footer from "./components/Footer";

export type AuthToken = {
  authToken: string;
  setAuthToken: Dispatch<SetStateAction<string>>;
};
export const AuthContext = createContext<AuthToken>({
  authToken: "",
  setAuthToken: () => {},
});

const App: React.FC<{}> = () => {
  const [authToken, setAuthToken] = useState("");
  const [username, setUsername] = useState("");

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
        <div className="flex flex-col h-full">
          <div className="flex-initial">
            <Navbar />
          </div>
          <div className="flex-auto">
            <Content />
          </div>
          <div className="flex-initial">
            <Footer username={username} />
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
