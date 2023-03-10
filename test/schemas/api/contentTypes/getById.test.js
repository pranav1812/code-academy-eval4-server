const validateGet = require('../../../../src/schemas/api/contentTypes/getById');

describe('schemas/api/contentTypes/getById', () => {
  it('should return 400 if validation fails', () => {
    const mockReq = {
      params: {
        id: 'test',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();
    validateGet(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400); // not a valid UUID
  });
  it('should call next if validation passes', () => {
    const mockReq = {
      params: {
        id: '00000000-0000-0000-0000-000000000000',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();
    validateGet(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
});
