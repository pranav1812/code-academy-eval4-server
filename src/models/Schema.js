const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Schema extends Model {
    static associate(models) {
      // belongs to: ContentType, fk: contentTypeId
      Schema.belongsTo(models.ContentType, {
        foreignKey: 'contentTypeId',
        as: 'contentType',
        onDelete: 'CASCADE',
      });
    }
  }
  Schema.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      contentTypeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      schema: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Schema',
      tableName: 'schema',
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Schema;
};
