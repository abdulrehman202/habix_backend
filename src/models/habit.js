class Habit{

    constructor(id, name, category, quantity, progress, interval, streaks , dateCreated, dateFinished)
    {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.progress = progress;
        this.interval = interval;
        this.streaks = streaks;
        this.dateCreated = dateCreated;
        this.dateFinished = dateFinished;
    }
    
}

export default  Habit;
