module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define("branch", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Branch.associate = models => {
    Branch.belongsTo(models.Project, { foreignKey: 'branchId' });
  };

  return Branch;
};