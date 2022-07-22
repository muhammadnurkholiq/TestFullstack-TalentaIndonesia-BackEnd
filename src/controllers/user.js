// model
const { user } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    res.status(200).send({
      status: "Success",
      message: "Success",
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: error,
    });
    console.log(error);
  }
};
