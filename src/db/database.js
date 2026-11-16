import Habit from '../models/habit.js';
import UserAuth from '../models/user_auth.js';
import UserProfile from '../models/user_profile.js';


class Database{
    static allHabits = [
            new Habit('1', 'Walking', 'HEALTH', 30, 0, 'DAILY', 0, Date.now()),
            new Habit('2', 'Drink Water', 'HEALTH', 8, 0, 'DAILY', 0, Date.now()),
            new Habit('3', 'Exercise', 'PRODUCTIVITY', 15, 0, 'WEEKDAYS', 0, Date.now()),
            new Habit('4', 'Read Book', 'MIND', 30, 0, 'WEEKEND', 0, Date.now()),
            new Habit('5', 'Long Drive', 'MIND', 20, 0, 'WEEKEND', 0, Date.now()),];

    static users = [
       new UserAuth('abdulrehman1411@gmail.com','$2b$10$9szFF7kT.BZbwm6Te28GyeJJkkTwA95vGy6HmijCvuSCNcL07qU4u'),

    ]

    static userProfiles = [
        new UserProfile('abdulrehman1411@gmail.com', 'Abdul Rehman', '1998-01-01', 70, 170, 'MALE')
    ]

    static tokens = [
    ]
}

export default Database;