export const onFirstInstall = (details: chrome.runtime.InstalledDetails) => {
  if (details.reason === "install") {
    console.log(details);
    chrome.identity.clearAllCachedAuthTokens(() => {
      console.log("OAuth cache cleared!");
    });
  }
};

export const onExtensionUpdate = (details: chrome.runtime.InstalledDetails) => {
  if (details.reason === "update") {
    console.log(details);
  }
};

chrome.runtime.onInstalled.addListener(onFirstInstall);
// chrome.runtime.onInstalled.addListener(onExtensionUpdate);
