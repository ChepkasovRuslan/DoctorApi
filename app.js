const { PORT, DB_CONNECTION } = require("./config");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/auth.routes");

const app = express();

const loadApp = async () => {
  try {
    mongoose.set("strictQuery", false);

    app.use(express.json());
    app.use(cors());
    app.use("/", userRoutes, authRoutes);

    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT);
  } catch (error) {
    process.exit(1);
  }
};

loadApp();
