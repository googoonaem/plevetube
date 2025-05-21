import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
const handleOpen = () => console.log("connected to DB🚀");
const handleError = (e) => console.log("DB Error🙅‍♂️", e.message);

db.on("error", handleError);
db.once("open", handleOpen);
