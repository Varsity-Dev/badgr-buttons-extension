import React, { useEffect, useState } from "react";

import type { DOMMessage, DOMMessageResponse } from "../chromeServices/types";

enum Platform {
  Other = "other",
  Badgr = "badgr",
  OpenCompetencyLibrary = "opencomplib",
}

const Content: React.FC<{}> = () => {
  const [badgeId, setBadgeId] = useState("");
  const [badgeTitle, setBadgeTitle] = useState("");
  const [badgeDescription, setBadgeDescription] = useState("");
  const [platform, setPlatform] = useState<Platform>(Platform.Other);

  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
        },
        (tabs) => {
          const activeTab = tabs[0];
          const platform = getPlatform(activeTab);
          const badgeId = getBadgeId(activeTab);
          chrome.tabs.sendMessage(
            activeTab.id || 0,
            { type: "GET_DOM" } as DOMMessage,
            (response: DOMMessageResponse) => {
              setBadgeTitle(response.badgeTitle);
              setBadgeDescription(response.badgeDescription);
              setBadgeId(badgeId);
              setPlatform(platform);
            }
          );
        }
      );
  }, []);

  return (
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
      <div className="flex-initial">
        <span>
          Platform:
          {" " + platform}
        </span>
      </div>
    </div>
  );
};

function getPlatform(activeTab: chrome.tabs.Tab): Platform {
  if (activeTab.url?.match(/^(https:\/\/)(badgr.com)/)?.length) {
    return Platform.Badgr;
  } else if (
    activeTab.url?.match(/^(https:\/\/)(lib.opencomplib.org)/)?.length
  ) {
    return Platform.OpenCompetencyLibrary;
  } else {
    return Platform.Other;
  }
}

function getBadgeId(activeTab: chrome.tabs.Tab): string {
  const badgeURL = activeTab.url as string;
  const matches = badgeURL.match(/\w+$/);
  const badgeId = matches && matches.length > 0 ? matches[0] : "";
  return badgeId;
}

export default Content;
