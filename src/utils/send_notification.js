import messaging from '../firebase/firebase.js';
import sendToUser from '../services/notificationService.js';

async function sendNotificationtoSingleUser(token, title, message) 
{
    await messaging.send({
        token, notification: {
            title: title,
            body: message,
        },
        data: {},
    });
}

async function sendNotificationtoMultipleUsers(tokens, title, message)
{
    sendToUser(tokens, {
        title: title,
        body: message,
        data: { habitId: '123' },
    });
}

export {sendNotificationtoSingleUser, sendNotificationtoMultipleUsers} 