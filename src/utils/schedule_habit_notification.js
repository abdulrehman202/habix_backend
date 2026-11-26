import cron, { getTask } from 'node-cron';
import { sendNotificationtoSingleUser } from './send_notification.js';
import db from '../db/database.js';

const dayMap = {
    'DAILY': '*',
    'WEEKEND':'0,6',
    'WEEKDAYS':'1,2,3,4,5'
};

async function scheduleHabitNotification(token,id, name, hour,minute, day){
    
    let task = cron.createTask(`${minute} ${hour} * * ${dayMap[day]}`, async () => {
        await sendNotificationtoSingleUser(token, 'Habit Reminder', `Time for ${name}`);
    }, {
        timezone: "Asia/Karachi" // Set your target timezone
    });
    task.start();
    db.tasks[id] = task.id;

}

async function updateScheduleHabitNotification(token,id, name, hour,minute, day){
    
    let taskId = db.tasks[id];
    let task;

    if(taskId)
    {
       task = getTask(taskId);
       task.destroy();
       db.tasks[id] = null;
    }
    
    task = cron.createTask(`${minute} ${hour} * * ${dayMap[day]}`, async () => {
        await sendNotificationtoSingleUser(token, 'Habit Reminder', `Time for ${name}`);
    }, {
        timezone: "Asia/Karachi" // Set your target timezone
    });
    task.start();
    db.tasks[id] = task.id;
}

async function deleteScheduleHabitNotification(id){
    
    let taskId = db.tasks[id];
    let task;

    if(taskId)
    {
       task = getTask(taskId);
       task.destroy();
       db.tasks[id] = null;
    }
}

export {scheduleHabitNotification, updateScheduleHabitNotification,deleteScheduleHabitNotification};