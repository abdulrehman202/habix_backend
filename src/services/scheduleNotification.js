import HabitController from '../controllers/habit_controller.js';
import { sendNotificationtoMultipleUsers } from '../utils/send_notification.js';
import db from '../db/database.js';

export default(async()=>{
    try {
  let habitController  = new HabitController();
  if(habitController.isAnyHabitRemainingForToday()){

    await sendNotificationtoMultipleUsers(db.deviceTokens,'Reminder','You have habits to complete today');
}
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
});