import React, { useEffect, useState } from "react";
import { Platform } from "../utils/content";

import type { DOMMessage, DOMMessageResponse } from "../chromeServices/types";

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
          const badgeId = getBadgeId(activeTab, platform);
          chrome.tabs.sendMessage(
            activeTab.id || 0,
            { type: "GET_DOM", platform } as DOMMessage,
            (response: DOMMessageResponse) => {
              setBadgeTitle(response?.badgeTitle);
              setBadgeDescription(response?.badgeDescription);
              setBadgeId(badgeId);
              setPlatform(platform);
            }
          );
        }
      );
  }, []);

  return (
    <div className="flex-col w-full p-4">
      <div className="flex-initial m-2">
        <span>Badge ID: {badgeId ? badgeId : "Not Found"}</span>
      </div>
      <div className="flex-initial m-2">
        <span>Badge Title: {badgeTitle ? badgeTitle : "Not Found"}</span>
      </div>
      <div className="flex-initial m-2">
        <span>
          Badge Description: {badgeDescription ? badgeDescription : "Not Found"}
        </span>
      </div>
      <div className="flex-initial m-2">
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

function getBadgeId(activeTab: chrome.tabs.Tab, platform: Platform): string {
  let badgeId = "";
  if (platform === Platform.Badgr) {
    const badgeURL = activeTab.url as string;
    const matches = badgeURL.match(/\w+$/);
    badgeId = matches && matches.length > 0 ? matches[0] : "";
  } else if (platform === Platform.OpenCompetencyLibrary) {
    badgeId = "";
  }

  return badgeId;
}

export default Content;
