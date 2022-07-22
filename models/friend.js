"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // friend table to user table
      friend.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  friend.init(
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      age: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "friend",
    }
  );
  return friend;
};
