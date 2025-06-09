import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { Person, Testimony } from "./models/Person.js";
import "dotenv/config";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://captainlegend007.github.io"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

await connectDB();

app.get("/", (req, res) => {
  res.send("Hello Express");
});

//Get all user data
app.get("/echurch/prayer-requests/:username/:password", async (req, res) => {
  const allUserData = await Person.find({});
  res.send(allUserData);
});

// // Saving Data in MongoDb
app.post("/echurch/prayer-request", async (req, res) => {
  console.log(req.body);
  try {
    const { name, number, prayer } = req.body;
    const newPerson = new Person({
      name,
      number,
      prayer,
    });
    await newPerson.save();
    console.log(newPerson);
    res.send("Person Added");
  } catch (error) {
    res.send(error.message);
  }
});

// Saving Data in MongoDb
app.post("/echurch/share-your-testimonies", async (req, res) => {
  console.log(req.body);
  try {
    const { name, number, testimony } = req.body;
    const newTestimony = new Testimony({
      name,
      number,
      testimony,
    });
    await newTestimony.save();
    console.log(newTestimony);
    res.send("Testimony Added");
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
