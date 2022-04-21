'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mainLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mainLink.belongsTo(models.user, {
        as: "ownerLink",
        foreignKey: {
          name: "idUser",
        },
      });
      mainLink.hasMany(models.link, {
        as: "links",
        foreignKey: {
          name: "idMainLink",
        },
      });
    }
  }
  mainLink.init({
    idUser: DataTypes.INTEGER,
    title: DataTypes.STRING,
    linkName: DataTypes.STRING,
    describtion: DataTypes.STRING,
    image: DataTypes.STRING,
    viewCount: DataTypes.INTEGER,
    templateId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'mainLink',
  });
  return mainLink;
};