'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      link.belongsTo(models.mainLink, {
        as: "mainLink",
        foreignKey: {
          name: "idMainLink",
        },
      });
    }
  }
  link.init({
    idMainLink: DataTypes.INTEGER,
    titleLink: DataTypes.STRING,
    link: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'link',
  });
  return link;
};