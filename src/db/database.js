import Habit from '../models/habit.js';

class Database{
    static allHabits = [
            new Habit('1', 'Walking', 'HEALTH', 30, 0, 'DAILY', 0, Date.now()),
            new Habit('2', 'Drink Water', 'HEALTH', 8, 0, 'DAILY', 0, Date.now()),
            new Habit('3', 'Exercise', 'PRODUCTIVITY', 15, 0, 'WEEKDAYS', 0, Date.now()),
            new Habit('4', 'Read Book', 'MIND', 30, 0, 'WEEKEND', 0, Date.now()),
            new Habit('5', 'Long Drive', 'MIND', 20, 0, 'WEEKEND', 0, Date.now()),];
}

export default Database;