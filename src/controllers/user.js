// model
const { user } = require("../../models");

// get all user
exports.getUsers = async (req, res) => {
  try {
    // get data user
    const userData = await user.findAll();

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
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};
