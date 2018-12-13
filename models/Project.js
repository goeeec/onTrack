module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("project", {
    projectId: {
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
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cloneUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Project.associate = models => {
    models.Project.hasMany(models.Branch);
    models.Project.hasOne(models.User, { foreignKey: "projectId", as: "owner" });
  }

  return Project;
};
