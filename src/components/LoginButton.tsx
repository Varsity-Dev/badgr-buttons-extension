import React, { useContext, MouseEventHandler } from "react";
import { AuthContext } from "../App";

const LoginButton: React.FC<{}> = () => {
  const { setAuthToken } = useContext(AuthContext);

  const handleLogin: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      setAuthToken(token as string);
    });
  };

  return (
    <button
      className="bg-green-800 text-white p-2 rounded-md"
      onClick={handleLogin}
    >
      Login
    </button>
  );
};

export default LoginButton;
