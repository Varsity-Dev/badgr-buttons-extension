import React from "react";

interface FooterProps {
  username: string;
}

const Footer: React.FC<FooterProps> = ({ username }) => {
  return (
    <div className="Footer">
      {username.length > 0 ? (
        <div className="flex-col items-center justify-center text-sm p-4">
          <div className="flex-initial text-center">
            <span>Signed in as: {username}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
