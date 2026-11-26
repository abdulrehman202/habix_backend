import cron from 'node-cron';
import { sendNotificationtoSingleUser } from './send_notification.js';

const dayMap = {
    'DAILY': '*',
    'WEEKEND':'0,6',
    'WEEKDAYS':'1,2,3,4,5'
};

async function scheduleHabitNotification(token, name, hour,minute, day){
    cron.schedule(`${minute} ${hour} * * ${dayMap[day]}`, async () => {
        await sendNotificationtoSingleUser(token, 'Habit Reminder', `Time for ${name}`);
    }, {
        timezone: "Asia/Karachi" // Set your target timezone
    });
}

export default scheduleHabitNotification;