const {
  createRecordService,
  updateRecordService,
} = require('../../services/records');

const createRecord = async (req, res) => {
  try {
    const { contentTypeId, record } = req.body;
    const newRecord = await createRecordService(contentTypeId, record);
    return res.status(201).json({
      message: 'Created New Record',
      data: newRecord,
      statusCode: 201,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { record } = req.body;
    const updatedRecord = await updateRecordService(id, record);
    return res.status(201).json({
      message: 'Updated Record',
      data: updatedRecord,
      statusCode: 201,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRecord,
  updateRecord,
};
