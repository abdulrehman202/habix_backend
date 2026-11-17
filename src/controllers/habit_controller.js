import Habit from '../models/habit.js';
import database from '../db/database.js';
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
            habitProgress.progress+=count;
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

    updateHabit(data)
    {
        const { id, name, category, quantity, interval, streaks, dateCreated } = data;

        var habit = new Habit(id, name, category, quantity, interval, streaks, dateCreated,);
        let currentHabits = database.allHabits;
        let index = currentHabits.findIndex(habitElement=>habitElement.id == habit.id);
        currentHabits[index] = habit;
        database.allHabits = currentHabits;
        return database.allHabits;
    }

    removeHabit(id)
    {
        let currentHabits = database.allHabits;
        let index = currentHabits.findIndex(habitElement=>habitElement.id == id);
        currentHabits.splice(index, 1);
        database.allHabits = currentHabits;
        return database.allHabits;
    }

}

export default HabitController;