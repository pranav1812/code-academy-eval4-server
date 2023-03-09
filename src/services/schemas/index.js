const { Schema } = require('../../models');

const createSchemaService = async (contentTypeId, schema) => {
  const newSchema = await Schema.create({
    contentTypeId,
    ...schema,
  });

  return newSchema;
};

const updateSchemaService = async (id, schema) => {
  const updatedSchema = await Schema.update(
    {
      ...schema,
    },
    {
      where: {
        id,
      },
    }
  );

  return updatedSchema;
};

module.exports = {
  createSchemaService,
  updateSchemaService,
};
