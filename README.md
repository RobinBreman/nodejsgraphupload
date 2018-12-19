# Microsoft Graph service large fil upload sample using Node.js

The Microsoft Graph API allows applications to call the API without user impersonation, that is, without a user signing in, using an app-only access token. This sample demonstrates how to request an app-only access token and upload large files using Node.js. 

## Prerequisites
To use this sample, you need the following: 
* [Node.js](https://nodejs.org/en/) is required to run the app and to install dependencies (via [npm](https://www.npmjs.com/)). 
* An Office 365 account. 
* An application registered in Azure AD. The application must be granted the correct permissions required to upload a file.

## Configure and run the app
1. Copy the  **config.demo.js** to **config.js**.
1. Using your favorite IDE, open **config.js** in the root directory.
2. Replace *ENTER_YOUR_CLIENT_ID* with the client ID of your registered Azure application.
3. Replace *ENTER_YOUR_SECRET* with a key generated on the **Configure** page of your app in the Microsoft Azure Management Portal.
4. Replace *ENTER_YOUR_TOKEN_ISSUING_ENDPOINT* with the *OAuth 2.0 token endpoint* value found by clicking the **View Endpoints** button in the Azure Management Portal. 
> Usally this endpoint is noted as https://login.microsoftonline.com/ _tenant-id_ /oauth2/token
5. Run `npm install` to install the app's dependencies. 
6. Run `npm start` to run the app.


## Additional resources
* [Office Dev Center](http://dev.office.com/)
* [Microsoft Graph API](http://graph.microsoft.io)
* [Call Microsoft Graph in a service or daemon app](http://graph.microsoft.io/docs/authorization/app_only)

