import app from "./app.js";
import { PORT } from "./config/config.js";
import { getusersfromdatabase } from "./controllers/userlist.controller.js";

app.listen(PORT, () => {
  console.log(`Running in http://localhost:${PORT}`);
});
