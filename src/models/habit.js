class Habit{

    constructor(id, name, category, quantity, interval,hour, minute, streaks , dateCreated, dateFinished)
    {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.interval = interval;
        this.hour = hour;
        this.minute = minute;
        this.streaks = streaks;
        this.dateCreated = dateCreated;
        this.dateFinished = dateFinished;
    }
    
}

export default  Habit;
