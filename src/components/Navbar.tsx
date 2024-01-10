import React from "react";
import LoginButton from "./LoginButton";

const Navbar: React.FC<{}> = () => {
  return (
    <div className="Navbar">
      <div className="flex w-full items-center justify-evenly h-full">
        <div className="flex-initial">
          <img className="h-8" src="./images/logo128.png" alt="badge eval" />
        </div>
        <div className="flex-initial">
          <h1 className="text-3xl font-bold">Badge Eval</h1>
        </div>
        <div className="flex-initial">
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
