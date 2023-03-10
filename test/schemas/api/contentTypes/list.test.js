const validateListRequest = require('../../../../src/schemas/api/contentTypes/list');

describe('schemas/api/contentTypes/list', () => {
  it('should return 400 if validation fails', () => {
    const mockReq = {
      query: {
        test: 'test',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();
    validateListRequest(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });
  it('should call next if validation passes', () => {
    const mockReq = {
      query: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();
    validateListRequest(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
});
