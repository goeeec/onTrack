const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
  const LocalAuth = sequelize.define("local_auth", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
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

  LocalAuth.associate = (models) => {
    LocalAuth.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return LocalAuth;
};
