jest.mock('../../../src/models');

const { Record } = require('../../../src/models');

const recordsServices = require('../../../src/services/records');

describe('services/records', () => {
  describe('createRecordService', () => {
    it('should create a new record', async () => {
      const contentTypeId = 1;
      const record = {
        data: {
          name: 'record name',
        },
      };
      Record.create.mockResolvedValue({
        dataValues: {
          id: 1,
          contentTypeId: 1,
          data: {
            name: 'record name',
          },
        },
      });
      const newRecord = await recordsServices.createRecordService(
        contentTypeId,
        record
      );
      expect(newRecord.dataValues).toHaveProperty('id');
      expect(newRecord.dataValues).toHaveProperty('contentTypeId');
      expect(newRecord.dataValues).toHaveProperty('data');
    });
  });
  describe('updateRecordService', () => {
    it('should update a record', async () => {
      const id = 1;
      const record = {
        name: 'new record name',
      };
      Record.findByPk.mockResolvedValue({
        dataValues: {
          id: 1,
          contentTypeId: 1,
          data: {
            name: 'record name',
          },
        },
      });
      Record.update.mockResolvedValue([1]);
      const updatedRecord = await recordsServices.updateRecordService(
        id,
        record
      );
      expect(updatedRecord).toHaveLength(1);
      expect(updatedRecord[0]).toBe(1);
    });
  });
  describe('deleteRecordService', () => {
    it('should delete a record', async () => {
      const id = 1;
      Record.destroy.mockResolvedValue(true);
      const deletedRecord = await recordsServices.deleteRecordService(id);
      expect(deletedRecord).toBe(true);
    });
  });
});
