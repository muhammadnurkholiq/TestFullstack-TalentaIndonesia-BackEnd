// model
const { user, friend } = require("../../models");

// joi
const Joi = require("joi");

// add friend
exports.addFriend = async (req, res) => {
  try {
    // get user id
    const idUser = req.user.id;

    // get input data
    const data = req.body;

    // validate input
    const schema = Joi.object({
      name: Joi.string().min(4).required(),
      gender: Joi.string().min(4).required(),
      age: Joi.number().required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        status: "Failed",
        message: error.details[0].message,
      });
    }

    // create new data database
    const newData = await friend.create({
      ...data,
      idUser,
    });

    // get data from database
    const dataFriend = await friend.findOne({
      where: {
        id: newData.id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    // response
    res.status(200).send({
      status: "Success",
      message: "Friend data added successfully",
      data: dataFriend,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};

// get all friend
exports.getFriends = async (req, res) => {
  try {
    // get data friend
    const friendData = await friend.findAll({
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    // condition if friend data not found
    if (friendData == "") {
      return res.send({
        status: "Success",
        message: "Friend data not found",
      });
    }

    // response
    res.status(200).send({
      status: "Success",
      message: "User data found",
      data: friendData,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};

// get friend
exports.getFriend = async (req, res) => {
  try {
    // get id params
    const { id } = req.params;

    // get data friend
    const friendData = await friend.findOne({
      where: {
        id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    // condition if friend data not found
    if (friendData == "") {
      return res.send({
        status: "Success",
        message: "Friend data not found",
      });
    }

    // response
    res.status(200).send({
      status: "Success",
      message: "User data found",
      data: friendData,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};

// update friend
exports.updateFriend = async (req, res) => {
  try {
    // get id params
    const { id } = req.params;

    // get input data
    const data = req.body;

    // validate input
    const schema = Joi.object({
      name: Joi.string().min(4).required(),
      gender: Joi.string().min(4).required(),
      age: Joi.number().required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        status: "Failed",
        message: error.details[0].message,
      });
    }

    // update data user
    await friend.update(data, {
      where: {
        id,
      },
    });

    // get data friend
    const friendData = await friend.findOne({
      where: {
        id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    res.status(200).send({
      status: "Success",
      message: "Friend data updated successfully",
      data: friendData,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};

// delete friend
exports.deleteFriend = async (req, res) => {
  try {
    // get id params
    const { id } = req.params;

    // delete friend
    await friend.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "Success",
      message: "Friend data deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};
