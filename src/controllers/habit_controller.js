import Habit from '../models/habit.js';
import database from '../db/database.js';
class HabitController {

    constructor() { }

    getAllHabits() {
        var allHabits = database.allHabits;

        return allHabits;
    }

    addHabit(data) {
        const { id, name, category, quantity, progress, interval, streaks, dateCreated } = data;

        var habit = new Habit(id, name, category, quantity, progress, interval, streaks, dateCreated,);
        database.allHabits.push(habit);
        return database.allHabits;
    }

    updateHabit(data)
    {
        const { id, name, category, quantity, progress, interval, streaks, dateCreated } = data;

        var habit = new Habit(id, name, category, quantity, progress, interval, streaks, dateCreated,);
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