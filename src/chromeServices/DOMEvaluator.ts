import { Platform } from "../utils/content";
import { DOMMessage, DOMMessageResponse } from "./types";

// DOM Evaluator Content Script => content.js

/**
 * @name messagesFromReactAppListener
 * @description Function called when a new message is received
 */
const messagesFromReactAppListener = (
  message: DOMMessage,
  messageSender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  console.debug("[content.js]. Message received", message);

  let badgeTitle: string = "";
  let badgeDescription: string = "";

  if (message.platform === Platform.Badgr) {
    const badgrData = getBadgrData();
    badgeTitle = badgrData.badgeTitle;
    badgeDescription = badgrData.badgeDescription;
  } else if (message.platform === Platform.OpenCompetencyLibrary) {
    const oclData = getOpenCompetencyLibraryData();
    badgeTitle = oclData.badgeTitle;
    badgeDescription = oclData.badgeDescription;
  }

  const response: DOMMessageResponse = {
    badgeTitle: badgeTitle,
    badgeDescription: badgeDescription,
  };

  console.log("[content.js]. Message response", response);

  sendResponse(response);
};

function getBadgrData() {
  const badgeTitle = document.querySelector("[role=heading]")?.textContent;
  const badgeDescription = document.querySelector(
    "[bgdatacy=top-description] > span"
  )?.textContent;

  return {
    badgeTitle: (badgeTitle as string).trim(),
    badgeDescription: (badgeDescription as string).trim(),
  };
}

function getOpenCompetencyLibraryData() {
  const badgeTitle = document.querySelector(
    "div.main-content > h1:nth-child(n+2)"
  )?.textContent;
  const badgeDescription = document.querySelector(
    "div.main-content > p:nth-child(n+6)"
  )?.textContent;

  return {
    badgeTitle: (badgeTitle as string).trim(),
    badgeDescription: (badgeDescription as string).trim(),
  };
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime?.onMessage?.addListener(messagesFromReactAppListener);
