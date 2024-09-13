import { Bot } from "grammy";
import { Task } from "./task/Task";
import { CronExpression } from "./task/CronExpression";
import { ReminderService } from "./services/reminderService";
import * as dotenv from "dotenv";
dotenv.config();


console.log("Starting bot...🚀");
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);
console.log("Bot started!🎉");

const reminderService = new ReminderService();

bot.on("message", async (ctx) => {
  const userId = ctx.message.from.id;
  const message = ctx.message.text;

  // aqui va tu codigo para hacer lo que quieras con el mensaje
  await reminderService.createReminder(userId, message, 10); // 10 segundos





  // aqui va tu codigo para hacer lo que quieras con el resultado

  bot.api.sendMessage(userId, "Recordatorio creado 🔮");
});
bot.start();


// Aquí va el código para enviar los recordatorios
const task = new Task(CronExpression.EVERY_SECOND, async () => {
  const reminders = await reminderService.checkReminders();

  for (const reminder of reminders) {
    bot.api.sendMessage(reminder.userId, `⏰ Recordatorio: ${reminder.message}`);
  }
});
task.startTask();
