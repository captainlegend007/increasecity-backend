import twilio from "twilio";
import "dotenv/config";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export const createMessage = async (firstName, lastName) => {
  try {
    const message = await client.messages.create({
      body: `${firstName} ${lastName} just registered for Increase Celebration`,
      from: "+15513734745",
      to: "+2348134225529",
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
