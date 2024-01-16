// TODO: things to store on local storage: authToken, userId, email.

export const useAuthInLocalStorage = async () => {
  // const authToken = await chrome.storage.local.get("auth_token");
  // const setAuthToken = async (authToken: string) => {
  //   await chrome.storage.local.set({ auth_token: authToken });
  // };
  // return [authToken, setAuthToken];
};

chrome.storage.local.set({ auth_token: "init_token" });
