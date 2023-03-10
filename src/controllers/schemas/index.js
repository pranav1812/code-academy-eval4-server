const {
  updateSchemaService,
  updateFieldNameService,
} = require('../../services/schemas');

const updateSchema = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...schema } = req.body;
    const updatedSchema = await updateSchemaService(id, schema);
    return res.status(201).json({
      message: 'Updated Schema',
      data: updatedSchema,
      statusCode: 201,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateFieldName = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldName, newName } = req.body;
    const updatedSchema = await updateFieldNameService(id, oldName, newName);
    return res.status(201).json({
      message: 'Updated Schema',
      data: updatedSchema,
      statusCode: 201,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  updateSchema,
  updateFieldName,
};
