// model
const { user } = require("../../models");

// joi
const Joi = require("joi");

// get all user
exports.getUsers = async (req, res) => {
  try {
    // get data user
    const userData = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    // condition if user data not found
    if (userData == "") {
      return res.send({
        status: "Success",
        message: "User data not found",
      });
    }

    // response
    res.status(200).send({
      status: "Success",
      message: "User data found",
      data: userData,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};

// get user
exports.getUser = async (req, res) => {
  try {
    // get id params
    const { id } = req.params;

    // get data user
    const userData = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    // condition if user data not found
    if (userData == "") {
      return res.send({
        status: "Success",
        message: "User data not found",
      });
    }

    // response
    res.status(200).send({
      status: "Success",
      message: "User data found",
      data: userData,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};

// update user
exports.updateUser = async (req, res) => {
  try {
    // get id params
    const { id } = req.params;

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

    // update data user
    await user.update(data, {
      where: {
        id,
      },
    });

    // get data user
    const userData = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.status(200).send({
      status: "Success",
      message: "User data updated successfully",
      data: userData,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    // get id params
    const { id } = req.params;

    // delete user
    await user.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "Success",
      message: "User data deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};
