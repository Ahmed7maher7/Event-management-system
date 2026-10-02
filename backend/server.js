require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const Category = require("./models/Category");
const User = require("./models/User");
const Event = require("./models/Event");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>
  res.json({ success: true, message: "Event Management API is running" }),
);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/registrations", require("./routes/registrationRoutes"));

app.use((req, res) =>
  res.status(404).json({ success: false, message: "Route not found" }),
);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  let categories = await Category.find();
  if (categories.length === 0) {
    categories = await Category.insertMany([
      { name: "Technology" },
      { name: "Business" },
      { name: "Design" },
      { name: "Community" },
      { name: "Education" },
    ]);
    console.log("Default categories added");
  }

  let demoUser = await User.findOne({ email: "demo@gather.local" });
  if (!demoUser) {
    demoUser = await User.create({
      name: "Gather Demo",
      email: "demo@gather.local",
      password: await bcrypt.hash("123456", 10),
    });
    console.log("Demo account added: demo@gather.local / 123456");
  }

  if ((await Event.countDocuments()) === 0) {
    const category =
      categories.find((item) => item.name === "Technology") || categories[0];
    await Event.insertMany([
      {
        title: "Frontend Night",
        description:
          "An evening of practical React ideas, patterns and live discussion.",
        date: new Date("2026-10-10T18:00:00"),
        location: "ITI Menoufia",
        capacity: 40,
        category: category._id,
        createdBy: demoUser._id,
      },
      {
        title: "Build Your First API",
        description:
          "A hands-on introduction to Node.js, Express and REST APIs.",
        date: new Date("2026-10-18T16:00:00"),
        location: "Menoufia Innovation Hub",
        capacity: 30,
        category: category._id,
        createdBy: demoUser._id,
      },
      {
        title: "Design Systems Meetup",
        description:
          "A friendly meetup about typography, color, components and product interfaces.",
        date: new Date("2026-10-25T17:30:00"),
        location: "Alexandria Creative Space",
        capacity: 50,
        category: category._id,
        createdBy: demoUser._id,
      },
    ]);
    console.log("Demo events added");
  }
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`),
  );
};

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1);
});
