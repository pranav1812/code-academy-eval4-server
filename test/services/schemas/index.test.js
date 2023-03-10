jest.mock('../../../src/models');

const { Schema, Record, ContentType } = require('../../../src/models');

const schemasServices = require('../../../src/services/schemas');

describe('services/schemas', () => {
  describe('getContentTypeByIdService', () => {
    it('should get a content type by id', async () => {
      const id = 1;
      ContentType.findByPk.mockResolvedValue({
        dataValues: {
          id: 1,
          name: 'content type name',
          records: [
            {
              dataValues: {
                id: 1,
                contentTypeId: 1,
                data: {
                  name: 'record name',
                },
              },
            },
          ],
          schema: {
            dataValues: {
              schema: {
                name: 'string',
              },
            },
          },
        },
      });
      const contentType = await schemasServices.getContentTypeByIdService(id);
      expect(contentType).toHaveProperty('id');
      expect(contentType).toHaveProperty('name');
      expect(contentType).toHaveProperty('records');
    });
  });
  describe('createSchemaService', () => {
    it('should create a new schema', async () => {
      const contentTypeId = 1;
      const schema = {
        schema: {
          name: 'string',
        },
      };
      Schema.create.mockResolvedValue({
        dataValues: {
          id: 1,
          contentTypeId: 1,
          schema: {
            name: 'string',
          },
        },
      });
      const newSchema = await schemasServices.createSchemaService(
        contentTypeId,
        schema
      );
      expect(newSchema.dataValues).toHaveProperty('id');
      expect(newSchema.dataValues).toHaveProperty('contentTypeId');
      expect(newSchema.dataValues).toHaveProperty('schema');
    });
  });
  describe('updateSchemaService', () => {
    it('should update a schema', async () => {
      const id = 1;
      const schema = {
        name: 'string',
      };
      Schema.findByPk.mockResolvedValue({
        dataValues: {
          id: 1,
          contentTypeId: 1,
          schema: {
            name: 'string',
          },
        },
      });
      Schema.update.mockResolvedValue([1]);
      const updatedSchema = await schemasServices.updateSchemaService(
        id,
        schema
      );
      expect(updatedSchema).toHaveLength(1);
      expect(updatedSchema[0]).toBe(1);
    });
    it('should throw an error when schema does not exist', async () => {
      const id = 1;
      const schema = {
        name: 'string',
      };
      Schema.findByPk.mockResolvedValue(null);
      await expect(
        schemasServices.updateSchemaService(id, schema)
      ).rejects.toThrow();
    });
  });
  describe('updateFieldNameService', () => {
    it('should update a field name when oldName and newName are provided', async () => {
      const id = 1;
      const oldName = 'name';
      const newName = 'Name';

      Schema.findByPk.mockResolvedValueOnce({
        dataValues: {
          id: 1,
          contentTypeId: 1,
          schema: {
            name: 'string',
          },
        },
      });

      ContentType.findByPk.mockResolvedValueOnce({
        dataValues: {
          id: 1,
          name: 'content type name',
          records: [],
          schema: {
            schema: {
              name: 'string',
            },
          },
        },
      });

      Schema.update.mockResolvedValue([1]);
      const updatedSchema = await schemasServices.updateFieldNameService(
        id,
        oldName,
        newName
      );
      expect(updatedSchema).toHaveLength(1);
      expect(updatedSchema[0]).toBe(1);
    });
    it('should throw an error when schema does not exist', async () => {
      const id = 1;
      const field = 'name';
      const name = 'string';
      Schema.findByPk.mockResolvedValue(null);
      await expect(
        schemasServices.updateFieldNameService(id, field, name)
      ).rejects.toThrow();
    });
  });
});
