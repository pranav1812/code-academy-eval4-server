const { Record } = require('../../models');

const createRecordService = async (contentTypeId, record) => {
  const newRecord = await Record.create({
    contentTypeId,
    ...record,
  });

  return newRecord;
};

const updateRecordService = async (id, record) => {
  // get the record,
  const recordToUpdate = await Record.findByPk(id);
  if (!recordToUpdate) {
    throw new Error('Record not found');
  }
  const newRecord = {
    ...recordToUpdate.dataValues,
    data: {
      ...recordToUpdate.dataValues.data,
      ...record,
    },
  };

  console.log('Update record service called', id, record);
  const updatedRecord = await Record.update(
    {
      ...newRecord,
    },
    {
      where: {
        id,
      },
    }
  );

  return updatedRecord;
};

const deleteRecordService = async (id) => {
  await Record.destroy({
    where: {
      id,
    },
  });
  return true;
};

module.exports = {
  createRecordService,
  updateRecordService,
  deleteRecordService,
};
