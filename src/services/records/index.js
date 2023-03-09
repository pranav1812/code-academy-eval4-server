const { Record } = require('../../models');

const createRecordService = async (contentTypeId, record) => {
  const newRecord = await Record.create({
    contentTypeId,
    ...record,
  });

  return newRecord;
};

const updateRecordService = async (id, record) => {
  const updatedRecord = await Record.update(
    {
      ...record,
    },
    {
      where: {
        id,
      },
    }
  );

  return updatedRecord;
};

module.exports = {
  createRecordService,
  updateRecordService,
};
