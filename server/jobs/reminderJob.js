import cron from "node-cron";
import dayjs from "dayjs";
import Reminder from "../models/Reminder.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

// Run every day at 8:00 AM
cron.schedule("0 8 * * *", async () => {
  console.log("🔔 Running daily reminder check...");

  const tomorrow = dayjs().add(1, "day").startOf("day");
  const nextDay = tomorrow.add(1, "day");

  const reminders = await Reminder.find({
    date: { $gte: tomorrow.toDate(), $lt: nextDay.toDate() },
    isCompleted: false,
  });

  for (const reminder of reminders) {
    const user = await User.findById(reminder.userId);

    if (user && user.email) {
      const subject = "Antenatal Visit Reminder - SafeMother ";
      const message = `Hi ${user.name}, this is a reminder from SafeMother.
You have an upcoming event: "${reminder.title}" scheduled for ${dayjs(reminder.date).format("dddd, MMMM D, YYYY")}.
${reminder.description ? "\n\nNote: " + reminder.description : ""}
\n\nRemember to stay healthy and hydrated 💧`;

      await sendEmail(user.email, subject, message);
    }
  }

  console.log(`✅ Checked reminders for ${tomorrow.format("MMM D, YYYY")}`);
});
