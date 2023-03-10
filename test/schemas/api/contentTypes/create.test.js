const validateCreate = require('../../../../src/schemas/api/contentTypes/create');

describe('schemas/api/contentTypes/create', () => {
  it('should return 400 if validation fails', () => {
    const mockReq = {
      body: {
        name: 'test',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();
    validateCreate(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });
  it('should call next if validation passes', () => {
    const mockReq = {
      body: {
        name: 'test',
        schema: {
          schema: {},
        },
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();
    validateCreate(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
});
