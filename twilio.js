import twilio from "twilio";
import "dotenv/config";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Add this line to check your variables
console.log("Account SID:", accountSid);
console.log("Auth Token:", authToken);

const client = twilio(accountSid, authToken);

export const createMessage = async (firstName, lastName) => {
  try {
    const message = await client.messages.create({
      body: `${firstName} ${lastName} just registered for Increase Celebration`,
      from: "+15513734745",
      to: "+2348134225529",
    });
    console.log("Message SID:", message.sid);
    console.log("Message Status:", message.status);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
