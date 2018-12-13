module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    githubId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    githubLogin: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    }
  });

  User.associate = models => {
    models.User.belongsTo(models.Project, { foreignKey: "ownerOfFk", as: "ownerOf" });
    models.User.belongsTo(models.Project, { foreignKey: "memberOfFk", as: "memberOf" });
  }

  return User;
};
