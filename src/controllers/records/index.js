const {
  createRecordService,
  updateRecordService,
  deleteRecordService,
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
    const { ...record } = req.body;
    console.log('Update record called', id, record);
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

const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRecordService(id);
    return res.status(204).json({
      message: 'Deleted Record',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRecord,
  updateRecord,
  deleteRecord,
};
