import { Reminder } from "./Reminder";

export class ReminderService {
    public reminders: Reminder[] = [];

    async createReminder(userId: number, message: string, seconds: number): Promise<boolean> {
        const reminder = new Reminder();
        reminder.userId = userId;
        reminder.message = message;
        const date = new Date();
        reminder.date = new Date(date.getTime() + seconds * 1000);

        console.log("Reminder created: ", reminder);
        this.reminders.push(reminder);
        return true;
    }
    async checkReminders(): Promise<Reminder[]> {
        const date = new Date();
        const reminders = this.reminders.filter((reminder) => reminder.date < date);
        this.reminders = this.reminders.filter((reminder) => reminder.date >= date);
        return reminders;
    }
}