import Habit from '../models/habit.js';
import database from '../db/database.js';
class HabitController {

    constructor() { }

    getAllHabits() {
        var allHabits = database.allHabits;

        return allHabits;
    }

    addHabit(data) {
        const { id, name, category, quantity, progress, interval, streak, dateCreated } = data;

        var habit = new Habit(id, name, category, quantity, progress, interval, streak, dateCreated,);
        database.allHabits.push(habit);
        return database.allHabits;
    }

}

export default HabitController;