const { ContentType } = require('../../models');

const { createSchemaService } = require('../schemas');

const createContentTypeService = async (contentType) => {
  const { schema, ...forContentTypeTable } = contentType;

  const newContentType = await ContentType.create({
    ...forContentTypeTable,
  });
  await createSchemaService(newContentType.dataValues.id, schema);
  return newContentType.dataValues;
};

// include: [records, schema]
const getContentTypeByIdService = async (id, user) => {
  // const contentType = await ContentType.findByPk(id, {
  //   include: ['records', 'schema'],
  // });
  // should now match id and user: include ['records', 'schema']
  const contentType = await ContentType.findOne({
    where: {
      id,
      user,
    },
    include: ['records', 'schema'],
  });
  return contentType.dataValues;
};

const getContentTypeListService = async (user) => {
  const contentTypes = await ContentType.findAll({
    where: {
      user,
    },
  });
  console.log(contentTypes);
  return contentTypes.map((contentType) => contentType.dataValues);
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
