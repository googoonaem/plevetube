import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/plevetube");

const db = mongoose.connection;
const handleOpen = () => console.log("connected to DB🚀");
const handleError = (e) => console.log("DB Error🙅‍♂️", e.message);

db.on("error", handleError);
db.once("open", handleOpen);
