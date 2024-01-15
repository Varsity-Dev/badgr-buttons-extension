import React, { useContext } from "react";
import LoginButton from "./LoginButton";
import { AuthContext } from "../App";

const Navbar: React.FC<{}> = () => {
  const { authToken } = useContext(AuthContext);

  return (
    <div className="Navbar">
      <div className="flex w-full items-center justify-evenly h-full">
        <div className="flex-initial ml-3 mr-3">
          <img className="h-8" src="./images/logo128.png" alt="badge eval" />
        </div>
        <div className="flex-initial">
          <h1 className="text-3xl font-bold">Badge Eval</h1>
        </div>
        <div className="flex-initial">
          {authToken.length > 0 ? <span>Welcome!</span> : <LoginButton />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
