const { PORT, DB_CONNECTION } = require("./config");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/auth.routes");
const doctorRoutes = require("./src/routes/doctor.routes");
const recordRoutes = require("./src/routes/record.routes");
const tokenRoutes = require("./src/routes/token.routes");
const { logInfo } = require("./src/services/logger.service");

const app = express();

const loadApp = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.set("debug", (collectionName, method) => {
      logInfo(`${collectionName}.${method}`);
    });

    app.use(express.json());
    app.use(cors());
    app.use(
      "/",
      userRoutes,
      authRoutes,
      doctorRoutes,
      recordRoutes,
      tokenRoutes
    );

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
