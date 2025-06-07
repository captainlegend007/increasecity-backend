import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { Person, Testimony } from "./models/Person.js";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://captainlegend007.github.io/"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

await connectDB();

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/your-data", async (req, res) => {
  try {
    const allData = await Person.find({});
    res.json(allData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Saving Data in MongoDb
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
