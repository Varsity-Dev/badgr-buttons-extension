import React from "react";

const LoginButton: React.FC<{}> = () => {
  const handleLogin = () => {
    console.log("Login Clicked");
  };

  return (
    <button className="bg-blue-800 p-2 rounded-md" onClick={handleLogin}>
      Login
    </button>
  );
};

export default LoginButton;
