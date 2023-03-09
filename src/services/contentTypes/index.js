const { ContentType } = require('../../models');

const { createSchemaService } = require('../schemas');

const createContentTypeService = async (contentType) => {
  const { schema, ...forContentTypeTable } = contentType;

  const newContentType = await ContentType.create({
    ...forContentTypeTable,
  });
  await createSchemaService(newContentType.dataValues.id, schema);
  return true;
};

// include: [records, schema]
const getContentTypeByIdService = async (id) => {
  const contentType = await ContentType.findByPk(id, {
    include: ['records', 'schema'],
  });
  return contentType.dataValues;
};

const getContentTypeListService = async () => {
  const contentTypes = await ContentType.findAll();
  return contentTypes.dataValues;
};

const updateContentTypeMetaService = async (id, name) => {
  const updatedContentType = await ContentType.update(
    {
      name,
    },
    {
      where: {
        id,
      },
    }
  );
  return updatedContentType;
};

module.exports = {
  createContentTypeService,
  getContentTypeByIdService,
  getContentTypeListService,
  updateContentTypeMetaService,
};
