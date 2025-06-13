import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { Person, Testimony } from "./models/Person.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://captainlegend007.github.io"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

await connectDB();

// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "We need token please provide it." });
  } else {
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decode) => {
      if (err) {
        return res.json({ message: "Authentication Error" });
      } else {
        req.username = decode.username;
        next();
      }
    });
  }
};

app.get("/", verifyUser, async (req, res) => {
  const allUserData = await Testimony.find({});
  return res.json({
    status: "success",
    name: req.username,
    database: allUserData,
  });
});

//Admin Login
// app.post("/admin", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const allUserData = await Testimony.find({});
//     if (
//       username === process.env.USERNAME &&
//       password === process.env.PASSWORD
//     ) {
//       res.status(201);
//       res.send(allUserData);
//     } else {
//       res.send("Invalid user");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    const token = jwt.sign({ username }, "our-jsonwebtoken-secret-key", {
      expiresIn: "1d",
    });
    res.cookie("token", token);

    return res.json({ status: "success" });
  } else {
    return res.json({ message: "Record doesn't exist" });
  }
});

// Handle User Logout
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: "success" });
});

// // Saving Prayer Request in MongoDb
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

// Saving Testimony in MongoDb
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
