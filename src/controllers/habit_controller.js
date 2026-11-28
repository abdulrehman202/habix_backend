import Habit from '../models/habit.js';
import database from '../db/database.js';
import HabitProgress from '../models/habit_progress.js';
import isWeekend from '../utils/check_weekend.js';
import {scheduleHabitNotification, updateScheduleHabitNotification, deleteScheduleHabitNotification} from '../utils/schedule_habit_notification.js';

class HabitController {

    constructor() { }

    getAllHabits = (req, res) => {
        var allHabits = database.allHabits;
        res.send({ allHabitsList: allHabits });
    }

    getAllProgress= (req, res) => {
        var progress = database.progress;
        res.send({allProgressList: progress});
    }

    incrementProgress = (req, res) => {
        let success = false;
        Object.keys(req.body).forEach((key) => {
            var progress = database.progress;
            var habitProgress = progress.find(habitElement => habitElement.habitId == key);
                let count = req.body[key];
            if (habitProgress) {
                habitProgress.progress += Number(count);
            }

            else {
                database.progress.push(new HabitProgress(key, Number(count)));
            }
            return true;
        });


        res.send({ success: success });
    }

    addHabit = async (req, res) => {
        const { id, name, category, quantity, interval, hour, minute, streaks, dateCreated } = req.body;
        var habit = new Habit(id, name, category, quantity, interval, hour, minute, streaks, dateCreated,);
        database.allHabits.push(habit);
        let newList = database.allHabits;
        let tokenOfDeviceLoggedIn = database.deviceTokens[0];
        await scheduleHabitNotification(tokenOfDeviceLoggedIn, id, name, hour, minute, interval);
        res.send({ allHabits: newList });
    }

    updateHabit = async (req, res)=> {
        const { id, name, category, quantity, interval, hour, minute, streaks, dateCreated } = req.body;
        var habit = new Habit(id, name, category, quantity, interval, hour, minute, streaks, dateCreated,);
        
        let currentHabits = database.allHabits;
        let index = currentHabits.findIndex(habitElement => habitElement.id == habit.id);
        currentHabits[index] = habit;
        database.allHabits = currentHabits;
        let newList = database.allHabits;

        let tokenOfDeviceLoggedIn = database.deviceTokens[0];
        await updateScheduleHabitNotification(tokenOfDeviceLoggedIn, id, name, hour, minute, interval);
        res.send({ updatedHabits: newList });
    }

    removeHabit = async (req,res)=> {
        let currentHabits = database.allHabits;
        let index = currentHabits.findIndex(habitElement => habitElement.id == req.params.id);
        currentHabits.splice(index, 1);
        database.allHabits = currentHabits;
        let newList = database.allHabits;
        await deleteScheduleHabitNotification(req.params.id);
        res.send({ updatedHabits: newList });
    }

    getAllHabitsQuantityforToday() {
        let weekDay = isWeekend() ? 'WEEKEND' : 'WEEKDAYS';
        let filteredHabits = database.allHabits.filter((h) => {
            if (h.interval == 'DAILY') {
                return true;
            }

            return h.interval == weekDay;
        });

        let mapQuantity = {};
        filteredHabits.map((h) => mapQuantity[h.id] = h.quantity);
        return mapQuantity;
    }

    isAnyHabitRemainingForToday() {
        let mapProgress = {};
        let allProgress = database.progress;
        let mapQuantity = this.getAllHabitsQuantityforToday();

        let isThereAnyPendingHabit = false;

        Object.keys(mapQuantity).forEach((key) => {
            let prog = allProgress.find((p) => p.habitId == key);
            if (prog) {
                mapProgress[key] = prog.progress;
            }
            else {
                mapProgress[key] = 0;
            }
        });

        Object.keys(mapProgress).forEach((key) => {

            if (mapProgress[key] < mapQuantity[key]) {
                isThereAnyPendingHabit = true;
            }
        });
        return isThereAnyPendingHabit;

    }

}

export default new HabitController();