import "./db";
import "./models/User";
import app from "./server";

const PORT = 3000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT} !! 💕`);
};

app.listen(PORT, handleListening);
