const { DataTypes } = require("sequelize");

const UserModel = (sequelize) => {
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

module.exports = UserModel;