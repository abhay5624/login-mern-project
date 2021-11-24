const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
const systemdata = require("../components/systeminfo");
const Message = require("../model/message");

require("../db/conn");
router.use(cookieParser());

const Users = require("../model/userscema");

router.get("/", (req, res) => {
  res.send("Hello from router");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plz filld the field properly" });
  }

  try {
    const userExist = await Users.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password don't match" });
    } else {
      const user = new Users({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });

      const userRgister = await user.save();
      if (userRgister) {
        res.status(200).json({ message: "user register successfuly" });
      }
    }
  } catch (errerw) {
    console.log(errerw);
  }
});
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please filled the data" });
    }
    const userLogin = await Users.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ message: "User not found 1" });
      } else {
        res.status(200).json(userLogin);
      }
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
  }
});
router.get("/userlogout", (req, res) => {
  res.clearCookie("jwtoken");
  console.log("User logout from server");
  res.status(200).send("User logout from server");
});
router.get("/about", authenticate, (req, res) => {
  res.status(200).send(req.rootUser);
});
router.get("/systemdata", (req, res) => {
  res.send(systemdata);
});

router.post("/contact", async (req, res) => {
  console.log("Hii from server Contact");
  const { name, email, msg } = req.body;
  if (!name || !email || !msg) {
    return res
      .status(422)
      .json({ error: "Plz filld the field properly /Server Contact PAge" });
  }
  try {
    const usermsg = new Message({
      name,
      email,
      msg,
    });
    const isSubmit = await usermsg.save();
    if (isSubmit) {
      return res.status(200).json({ message: "message send Successfully" });
    }
  } catch (err) {
    console.log("error from contact:", err);
  }
});
module.exports = router;
