module.exports = (sequelize, DataTypes) => {
  const GithubAuth = sequelize.define("githubAuth", {
    githubId: {
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
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    }
  });

  GithubAuth.associate = (models) => {
    GithubAuth.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return GithubAuth;
};
