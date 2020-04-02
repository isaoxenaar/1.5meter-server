const Sequelize = require("sequelize");
const db = require("../db");

const Warning = db.define("warning", {
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  targetId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Warning;
