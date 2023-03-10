const { Schema, Record, ContentType } = require('../../models');

const getContentTypeByIdService = async (id) => {
  const contentType = await ContentType.findByPk(id, {
    include: ['records', 'schema'],
  });
  return contentType.dataValues;
};

const createSchemaService = async (contentTypeId, schema) => {
  const newSchema = await Schema.create({
    contentTypeId,
    ...schema,
  });

  return newSchema;
};

const updateSchemaService = async (id, schema) => {
  // get the schema,
  const schemaToUpdate = await Schema.findByPk(id);
  if (!schemaToUpdate) {
    throw new Error('Schema not found');
  }
  const newSchema = {
    ...schemaToUpdate.dataValues,
    schema: {
      ...schemaToUpdate.dataValues.schema,
      ...schema,
    },
  };
  const updatedSchema = await Schema.update(
    {
      ...newSchema,
    },
    {
      where: {
        id,
      },
    }
  );

  return updatedSchema;
};

const updateFieldNameService = async (id, oldName, newName) => {
  // oldName && newName => update
  // oldName && !newName => delete

  // get the schema,
  const schemaToUpdate = await Schema.findByPk(id);
  const schemaFields = schemaToUpdate.dataValues.schema;

  // when there are records in the ContentType, we cannot update the field name, but deletion is allowed
  console.log(
    '23',
    schemaToUpdate.dataValues.contentTypeId,
    typeof getContentTypeByIdService
  );

  const contentType = await getContentTypeByIdService(
    schemaToUpdate.dataValues.contentTypeId
  ); // this will give getContentTypeByIdService is not a function because
  console.log('----------------------------------------');

  if (contentType.records.length > 0) {
    if (newName) {
      throw new Error('Cannot update field name when there are records');
    }
  }

  if (!schemaFields[oldName]) {
    throw new Error('Field not found');
  }
  const newSchemaFields = {
    ...schemaFields,
  };
  if (newName) {
    newSchemaFields[newName] = newSchemaFields[oldName];
  }
  delete newSchemaFields[oldName];
  const newSchema = {
    ...schemaToUpdate.dataValues,
    schema: {
      ...newSchemaFields,
    },
  };
  const updatedSchema = await Schema.update(
    {
      ...newSchema,
    },
    {
      where: {
        id,
      },
    }
  );

  // if deletion condition
  if (!newName) {
    const newRecordsPromises = [];
    const records = await Record.findAll({
      where: {
        contentTypeId: schemaToUpdate.dataValues.contentTypeId,
      },
    });

    records.forEach((record) => {
      const { id: recordId, data: recordData } = record.dataValues;
      delete recordData[oldName];
      // upsert the record
      newRecordsPromises.push(
        Record.update(
          {
            data: {
              ...recordData,
            },
          },
          {
            where: {
              id: recordId,
            },
          }
        )
      );
    });
    await Promise.all(newRecordsPromises);
  }

  return updatedSchema;
};

module.exports = {
  createSchemaService,
  updateSchemaService,
  updateFieldNameService,
};
