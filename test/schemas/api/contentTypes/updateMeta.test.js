const validateUpdate = require('../../../../src/schemas/api/contentTypes/updateMeta');

describe('schemas/api/contentTypes/updateMeta', () => {
  it('should return 400 if validation fails', () => {
    const mockReq = {
      body: {
        name: 'test',
      },
      params: {
        id: 'test',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();
    validateUpdate(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });
  it('should call next if validation passes', () => {
    const mockReq = {
      body: {
        name: 'test',
      },
      params: {
        id: '00000000-0000-0000-0000-000000000000',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();
    validateUpdate(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
});
