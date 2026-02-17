import app from "./app";
import { sequelize } from "./config/db";
import { ENVS } from "./config/envs";

const PORT = ENVS.PORT;

async function startServer() {
  try {
    await sequelize.sync({ force: false });
    console.log("Database connected successfully");
    console.log(`Server running on PORT ${PORT}`);

    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("There was an error starting the server", error);
    throw error;
  }
}

startServer();
