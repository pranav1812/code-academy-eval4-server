const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ContentType extends Model {
    static associate(models) {
      // define association here:
      // hasMany: Record, fk: contentTypeId
      ContentType.hasMany(models.Record, {
        foreignKey: 'contentTypeId',
        as: 'records',
      });
      // hasMany: Schema, fk: contentTypeId
      ContentType.hasOne(models.Schema, {
        foreignKey: 'contentTypeId',
        as: 'schema',
      });
    }
  }
  ContentType.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ContentType',
      tableName: 'content_type',
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return ContentType;
};
