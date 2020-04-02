const Sequelize = require("sequelize");
const db = require("../db");
const Warning = require("./warning/model");

const User = db.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    profileUrl: {
      type: Sequelize.STRING,
      allowNull: false
    },
    songMP3: {
      type: Sequelize.STRING,
      allowNull: false
    },
    socketId: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
    tableName: "users"
  }
);
User.hasMany(Warning);
Warning.belongsTo(User);
module.exports = User;
