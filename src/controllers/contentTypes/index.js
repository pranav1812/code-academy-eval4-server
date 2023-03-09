const {
  createContentTypeService,
  getContentTypeByIdService,
  getContentTypeListService,
  updateContentTypeMetaService,
} = require('../../services/contentTypes');

const getContentTypesList = async (req, res) => {
  try {
    const contentTypes = await getContentTypeListService();
    return res.status(200).json({
      message: 'Content Types List fetched',
      data: contentTypes,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const contentType = await getContentTypeByIdService(id);
    return res.status(200).json({
      message: 'Content Type fetched',
      data: contentType,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}; // complete info

const createContentType = async (req, res) => {
  try {
    const createdContentType = await createContentTypeService(req.body);
    return res.status(201).json({
      message: 'Created New Content Type',
      data: createdContentType,
      statusCode: 201,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateContentType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedContentType = await updateContentTypeMetaService(id, name);
    return res.status(201).json({
      message: 'Updated Content Type',
      data: updatedContentType,
      statusCode: 201,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getContentTypesList,
  getContentById,
  createContentType,
  updateContentType,
};
