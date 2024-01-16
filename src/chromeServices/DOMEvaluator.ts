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
  console.log("[content.js]. Message received", message);

  const badgeTitle = document.querySelector("[role=heading]")?.textContent;
  const badgeDescription = document.querySelector(
    "[bgdatacy=top-description] > span"
  )?.textContent;

  const response: DOMMessageResponse = {
    badgeTitle: badgeTitle as string,
    badgeDescription: badgeDescription as string,
  };

  console.log("[content.js]. Message response", response);

  sendResponse(response);
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime?.onMessage?.addListener(messagesFromReactAppListener);
