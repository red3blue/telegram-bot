import * as cron from 'node-cron';

export class Task {
    public cronExpression: string;
    private taskCallback: () => void;

    constructor(cronExpression: string, taskCallback: () => void) {
        if (!this.isValidCronExpression(cronExpression)) {
            throw new Error('Invalid cron expression');
        }
        this.cronExpression = cronExpression;
        this.taskCallback = taskCallback;
    }

    private isValidCronExpression(cronExpression: string): boolean {
        const cronRegex = /^(\*|[0-5]?\d) (\*|[0-5]?\d) (\*|1?\d|2[0-3]) (\*|[1-9]|[12]\d|3[01]) (\*|[1-9]|1[0-2]) (\*|[0-6])$/;
        return cronRegex.test(cronExpression);
    }

    public startTask(): void {
        if (cron.validate(this.cronExpression)) {
            cron.schedule(this.cronExpression, this.taskCallback);
        } else {
            throw new Error('Invalid cron expression');
        }
    }
}
