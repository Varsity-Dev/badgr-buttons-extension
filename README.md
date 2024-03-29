# Badge Eval

Request a live/scheduled Evaluation or async assignment.

> Important:\
> This extension **doesn't work on Brave or Chromium**. It **only works on Google Chrome** because of Google OAuth 2.0 API.\
> It also requires to have _Google Chrome Sync_ enabled.

## Specs

1. A chrome extension like Badge Extras that detects a badge page in Badgr or GitHub and provides a way to request an evaluation (either live/scheduled or async assignment).\
   1.1 [Creating a Chrome extension with React and TypeScript](https://blog.logrocket.com/creating-chrome-extension-react-typescript/)\
   1.2 [Chrome Extension Tutorials](https://developer.chrome.com/docs/extensions/get-started)\
   1.3 [Creating a Chrome Extension with React](https://medium.com/@tharshita13/creating-a-chrome-extension-with-react-a-step-by-step-guide-47fe9bab24a1)
2. The extension should extract badge info from the url and consult an API endpoint for eval options. Then provide those options to the user in the form of buttons or some other method.
3. After initial installation of the extension, it should require a Google login. Login info should be stored in the extensions cookies/state and sent with every API call.\
   3.1 [Google OAuth 2.0 on Chrome Extension](https://developer.chrome.com/docs/extensions/how-to/integrate/oauth)\
   3.2 [Google OAuth 2.0 Protocol](https://developers.google.com/identity/protocols/oauth2#clientside)
   3.3 [Google Console API - Credentials](https://console.cloud.google.com/apis/credentials?authuser=1&project=badge-eval)
4. Project Owner will provide the API endpoint.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles the app and it contains the unpacked browser extension.\
Then, you can load the unpacked extension into Chrome through the extension menu option and turn the developer mode on.

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Be careful with the chrome browser API.

### `npm test`

Launches the test runner in the interactive watch mode.
