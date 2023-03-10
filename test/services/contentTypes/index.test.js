const { createSchemaService } = require('../../../src/services/schemas');

jest.mock('../../../src/models');
jest.mock('../../../src/services/schemas');

const { ContentType } = require('../../../src/models');

const contentTypesServices = require('../../../src/services/contentTypes');

describe('services/contentTypes', () => {
  describe('createContentTypeService', () => {
    it('should create a new content type', async () => {
      const contentType = {
        name: 'content type name',
        schema: {
          schema: {
            name: 'schema name',
            fields: [
              {
                name: 'field name',
                type: 'string',
              },
            ],
          },
        },
      };
      ContentType.create.mockResolvedValue({
        dataValues: {
          id: 1,
          name: 'content type name',
        },
      });
      createSchemaService.mockResolvedValue({
        dataValues: {
          id: 1,
          name: 'schema name',
          fields: [
            {
              name: 'field name',
              type: 'string',
            },
          ],
        },
      });
      const newContentType =
        await contentTypesServices.createContentTypeService(contentType);
      expect(newContentType).toHaveProperty('id');
      expect(newContentType).toHaveProperty('name');
    });
  });
  describe('getContentTypeByIdService', () => {
    it('should get a content type by id', async () => {
      const id = 1;
      const user = 1;
      ContentType.findOne.mockResolvedValue({
        dataValues: {
          id: 1,
          name: 'content type name',
          records: [
            {
              id: 1,
              name: 'record name',
              fields: [
                {
                  name: 'field name',
                  type: 'string',
                },
              ],
            },
          ],
          schema: {
            id: 1,
            name: 'schema name',
            fields: [
              {
                name: 'field name',
                type: 'string',
              },
            ],
          },
        },
      });
      const contentType = await contentTypesServices.getContentTypeByIdService(
        id,
        user
      );
      expect(contentType).toHaveProperty('id');
      expect(contentType).toHaveProperty('name');
      expect(contentType).toHaveProperty('records');
      expect(contentType).toHaveProperty('schema');
    });
  });
  describe('getContentTypeListService', () => {
    it('should get a list of content types', async () => {
      const user = 1;
      ContentType.findAll.mockResolvedValue([
        {
          dataValues: {
            id: 1,
            name: 'content type name',
          },
        },
        {
          dataValues: {
            id: 2,
            name: 'content type name',
          },
        },
      ]);
      const contentTypes = await contentTypesServices.getContentTypeListService(
        user
      );
      expect(contentTypes).toHaveLength(2);
      expect(contentTypes[0]).toHaveProperty('id');
      expect(contentTypes[0]).toHaveProperty('name');
      expect(contentTypes[1]).toHaveProperty('id');
      expect(contentTypes[1]).toHaveProperty('name');
    });
  });
  describe('updateContentTypeMetaService', () => {
    it('should update a content type', async () => {
      const id = 1;
      const name = 'new content type name';
      ContentType.update.mockResolvedValue([1]);
      const updatedContentType =
        await contentTypesServices.updateContentTypeMetaService(id, name);
      expect(updatedContentType).toHaveLength(1);
      expect(updatedContentType[0]).toBe(1);
    });
  });
});
