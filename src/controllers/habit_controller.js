import Habit from '../models/habit.js';
import database from '../db/database.js';
import HabitProgress from '../models/habit_progress.js';
import isWeekend from '../utils/check_weekend.js';
import Database from '../db/database.js';

class HabitController {

    constructor() { }

    getAllHabits() {
        var allHabits = database.allHabits;

        return allHabits;
    }

    getAllProgress() {
        var progress = database.progress;

        return progress;
    }

    incrementProgress(id, count) {
        var progress = database.progress;
        var habitProgress = progress.find(habitElement => habitElement.habitId == id);
        if (habitProgress) {
            habitProgress.progress += Number(count);
        }

        else {
            database.progress.push(new HabitProgress(id, Number(count)));
        }
        return true;
    }

    decrementProgress(id) {
        var progress = database.progress;
        var habitProgress = progress.find(habitElement => habitElement.habitId == id);
        if (habitProgress) {
            habitProgress.progress--;
        }
        return true;
    }

    addHabit(data) {
        const { id, name, category, quantity, interval, streaks, dateCreated } = data;

        var habit = new Habit(id, name, category, quantity, interval, streaks, dateCreated,);
        database.allHabits.push(habit);
        return database.allHabits;
    }

    updateHabit(data) {
        const { id, name, category, quantity, interval, streaks, dateCreated } = data;

        var habit = new Habit(id, name, category, quantity, interval, streaks, dateCreated,);
        let currentHabits = database.allHabits;
        let index = currentHabits.findIndex(habitElement => habitElement.id == habit.id);
        currentHabits[index] = habit;
        database.allHabits = currentHabits;
        return database.allHabits;
    }

    removeHabit(id) {
        let currentHabits = database.allHabits;
        let index = currentHabits.findIndex(habitElement => habitElement.id == id);
        currentHabits.splice(index, 1);
        database.allHabits = currentHabits;
        return database.allHabits;
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

export default HabitController;