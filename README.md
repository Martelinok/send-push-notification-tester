# Firebase Push Notification Server

This is a mini backend developed with **Node.js** and **Express** that allows sending push notifications to devices registered in **Firebase Cloud Messaging (FCM)**.

## 🚀 Features
- Send push notifications to Android and iOS devices.
- Error handling and data validation.
- Uses Firebase Admin SDK for authentication.
- Lightweight server based on Express.

## 🛠 Prerequisites

Before running this server, make sure you have installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **Firebase account** with FCM setup.
- Firebase credentials JSON file (`opServiceAccount.json`).

## 📦 Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   
2. Install dependencies:
   ```sh
   npm install

3.	Add the Firebase credentials file (opServiceAccount.json) to the root of the project. You can obtain this file from Firebase Console under Project Settings > Service Accounts.

⚙ Configuration

The Firebase credentials are stored in config.js. The configuration looks like this:
```javascript
var admin = require("firebase-admin");
// Import Firebase service account credentials
var serviceAccount = require("./opServiceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mouse-lumi.firebaseio.com"
});
module.exports.admin = admin;
```

🚀 Usage

1️⃣ Run the server

To start the server on localhost:3000, run:
```sh
node index.js
```
You should see a message in the console:
```
Listening on port 3000
```
2️⃣ Send a push notification

Make a POST request to:
```Endpoint:
http://localhost:3000/firebase/notification
```
```json:
{
    "registrationToken": "FCM_TOKEN",
    "message": "Test Notification",
    "body": "Notification sent using Node.js",
    "data": {
      "notification_type": "crypto_alert",
      "symbols": "BTC,ETH",
      "timestamp": "2025-01-28T12:00:00Z",
      "event_type": "notification_sent"
    }
}
```
📌 Note: Replace "FCM_TOKEN" with a valid Firebase device token.

3️⃣ Expected response

If the notification is sent successfully, you will receive:
```json:
{
    "success": true,
    "message": "Notification sent successfully",
    "response": "message_id"
}
```
If any required field is missing or an error occurs, you will receive a response like:
```json
{
    "error": "Missing required fields: message, body, registrationToken, and data"
}
```
🛠 Error Handling

The backend includes basic error handling to ensure smooth operation:
	•	Missing required fields: The server checks if message, body, registrationToken, and data are present before processing the request.
	•	Invalid FCM Token: If the token is incorrect or expired, Firebase will return an error.
	•	Server errors: Any unexpected issue will return a 500 Internal Server Error with detailed logs.

📂 Project Structure
```
📦 your-repo/
├── 📄 index.js            # Main server (Express)
├── 📄 config.js           # Firebase configuration
├── 📄 opServiceAccount.json  # Firebase credentials (Do not upload to Git!)
├── 📄 package.json        # Project dependencies
└── 📄 README.md           # Documentation
```
🛠 Technologies Used
	•	Node.js - Runtime environment
	•	Express - Web framework for handling routes
	•	Firebase Admin SDK - Sending notifications

🚀 Future Improvements

Here are some potential improvements to make the backend even more robust:
	•	Implement user authentication: Secure the API with tokens or API keys.
	•	Add logging: Use Winston or Morgan to track requests and errors.
	•	Rate limiting: Prevent abuse by limiting the number of notifications per user.
	•	Deploy to cloud: Deploy on Heroku, Vercel, or a Docker container.

📜 License

This project is open-source under the MIT license.
---
💡 Additional Notes
	•	Never upload the opServiceAccount.json file to GitHub. Add this file to .gitignore to prevent leaks.
	•	For production deployment, consider using PM2 or Docker.
 
