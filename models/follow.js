'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    static associate(models) {
      // define association here
      Follow.belongsTo(models.Profile, { as: 'follower', foreignKey: 'followerId' });
      Follow.belongsTo(models.Profile, { as: 'following', foreignKey: 'followingId' });
    }
  };
  Follow.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    followerId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    followingId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};
