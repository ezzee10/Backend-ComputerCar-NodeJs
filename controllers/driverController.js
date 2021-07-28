const Driver = require("../models/Driver");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.createDriver = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //Reviso primero si ya hay un usuario con ese email
    let driver = await Driver.findOne({ email });

    if (driver) {
      return res.status(400).json({ msg: "The driver already exists" });
    }

    //creo el nuevo conductor
    driver = new Driver(req.body);

    //Hasheo el password
    const salt = await bcrypt.genSalt(10);
    (driver.password = await bcrypt.hash(password, salt)),
      //guardo el conductor
      await driver.save();

    //Creo el payload
    const payload = {
      driver: {
        id: driver.id,
      },
    };

    //Firmo el JWT con el token generado
    jwt.sign(payload, process.env.SECRET, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Ups, an error occurred...");
  }
};

exports.getDriver = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //Reviso primero si ya hay un usuario con ese email
    let driver = await Driver.find({ _id: req.driver.id });

    delete driver[0].password;

    console.log(driver[0]);

    if (driver) {
      return res.json({ driver });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Ups, an error occurred...");
  }
};
