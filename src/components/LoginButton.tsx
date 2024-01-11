import React, { useContext, MouseEventHandler } from "react";
import { AuthContext } from "../App";

const LoginButton: React.FC<{}> = () => {
  const { setAuthToken } = useContext(AuthContext);

  const handleLogin: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("Login Clicked");
    chrome.identity.clearAllCachedAuthTokens();
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      console.log("Token: " + token);
      setAuthToken(token as string);
    });
  };

  return (
    <button className="bg-blue-800 p-2 rounded-md" onClick={handleLogin}>
      Login
    </button>
  );
};

export default LoginButton;
