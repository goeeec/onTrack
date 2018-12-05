const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
  const LocalAuth = sequelize.define("localAuth", {
    githubId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password_hash: {
      type: DataTypes.STRING
    }
  });

  LocalAuth.beforeCreate(user =>
    new sequelize.Promise(resolve => {
      bcrypt.hash(user.password_hash, null, null, (err, hashedPassword) => {
        resolve(hashedPassword);
      });
    }).then(hashedPw => {
      user.password_hash = hashedPw;
    })
  );

  LocalAuth.associate = models => {
    LocalAuth.belongsTo(models.User, { foreignKey: "userId" });
  };

  return LocalAuth;
};
