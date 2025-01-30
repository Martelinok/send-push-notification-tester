const express = require('express');
const bodyParser = require('body-parser');
const { admin } = require('./config');

const app = express();
app.use(bodyParser.json());

const port = 3000;

const getRandomInt = (max) => {
    return Math.floor(1 + Math.random() * max);
};

app.post('/firebase/notification', async (req, res) => {
    try {
        // Validate that required fields are present
        const { message, body, registrationToken, data } = req.body;
        if (!message || !body || !registrationToken || !data) {
            return res.status(400).json({ error: 'Missing required fields: message, body, registrationToken, and data' });
        }

        // Add a random NotificationId
        data["NotificationId"] = getRandomInt(99999).toString();

        // Build the message
        const notificationMessage = {
            android: {
                notification: {
                    title: message,
                    body: body
                }
            },
            apns: {
                payload: {
                    aps: {
                        alert: {
                            title: message,
                            body: body
                        },
                        sound: 'default'
                    }
                }
            },
            token: registrationToken,
            data: data
        };

        // Send notification
        const response = await admin.messaging().send(notificationMessage);

        res.status(200).json({ success: true, message: "Notification sent successfully", response });
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({ error: "Failed to send notification", details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});