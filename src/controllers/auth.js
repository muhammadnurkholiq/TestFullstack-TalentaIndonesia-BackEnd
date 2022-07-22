// model
const { user } = require("../../models");

// joi
const Joi = require("joi");

// import bcrypt
const bcrypt = require("bcrypt");

// import jwt
const jwt = require("jsonwebtoken");

// register
exports.register = async (req, res) => {
  try {
    // get input data
    const data = req.body;

    // validate input
    const schema = Joi.object({
      name: Joi.string().min(4).required(),
      email: Joi.string().email().min(4).required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        status: "Failed",
        message: error.details[0].message,
      });
    }

    // check email user exist
    const emailExist = await user.findOne({
      where: {
        email: data.email,
      },
    });

    if (emailExist) {
      return res.send({
        status: "Failed",
        message: "Email has been registered",
      });
    }

    // hased password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // create new data database
    const newData = await user.create({
      ...data,
      password: hashedPassword,
    });

    // get data from database
    const dataUser = await user.findOne({
      where: {
        id: newData.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    // response
    res.status(200).send({
      status: "Success",
      message: "Account registration successful",
      data: dataUser,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};

// login
exports.login = async (req, res) => {
  try {
    // get input data
    const data = req.body;

    // validate input
    const schema = Joi.object({
      email: Joi.string().email().min(4).required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        status: "Failed",
        message: error.details[0].message,
      });
    }

    // check email user exist
    const emailExist = await user.findOne({
      where: {
        email: data.email,
      },
    });

    if (emailExist === null) {
      return res.send({
        status: "Failed",
        message: "Invalid email or password",
      });
    }

    // check password
    const isValid = await bcrypt.compare(data.password, emailExist.password);

    if (!isValid) {
      return res.send({
        status: "Failed",
        message: "Invalid email or password",
      });
    }

    // generate token
    const token = jwt.sign({ id: emailExist.id }, process.env.TOKEN_KEY);

    // data user
    const dataUser = {
      id: emailExist.id,
      name: emailExist.name,
      email: emailExist.email,
      token,
    };

    // response
    res.status(200).send({
      status: "Success",
      message: "Login successful",
      data: dataUser,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};

// check auth
exports.checkAuth = async (req, res) => {
  try {
    // get id user
    const id = req.user.id;

    // get data user
    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(400).send({
        status: "Failed",
        message: "User not found",
      });
    }

    // response
    res.status(200).send({
      status: "Success",
      message: "Login successful",
      data: dataUser,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};
