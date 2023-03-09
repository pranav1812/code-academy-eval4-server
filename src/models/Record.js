const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    static associate(models) {
      // belongs to: ContentType, fk: contentTypeId
      Record.belongsTo(models.ContentType, {
        foreignKey: 'contentTypeId',
        as: 'contentType',
        onDelete: 'CASCADE',
      });
    }
  }
  Record.init(
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
      data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Record',
      tableName: 'record',
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Record;
};
