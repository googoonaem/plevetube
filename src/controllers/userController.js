import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { name, username, password2, email, password, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errMsg: `Please confirmation does not match.`,
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errMsg: `this username/email is already taken.`,
    });
  }
  try {
    await User.create({
      name,
      username,
      password,
      email,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(500).render("join", {
      pageTitle: "Join",
      errMsg: error._message,
    });
  }
};
export const getLogin = async (req, res) => {
  res.render("login", { pageTitle: "login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errMsg: "An account with this username does not exists",
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errMsg: "wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;

  res.redirect("/");
};
export const edit = (req, res) => {
  res.send("edit user");
};
export const deleteUser = (req, res) => {
  res.send("delete User");
};

export const logout = (req, res) => {
  res.send("logout");
};

export const see = (req, res) => {
  res.send("user profile");
};

export const color = (req, res) => {
  res.render("color");
};
