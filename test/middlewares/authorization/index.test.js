const axios = require('axios');
const {
  validateUserToken,
  validateAdminToken,
} = require('../../../src/middlewares/authorization/index');

describe('middlewares/authorization/index', () => {
  describe('validateUserToken', () => {
    it('should return 401 if token is not provided', async () => {
      const mockReq = {
        headers: {},
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(axios, 'post').mockRejectedValue({
        response: {
          status: 401,
          error: 'token is not provided',
        },
      });
      const mockNext = jest.fn();
      await validateUserToken(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });
    it('should return 403 if roole is not user or admin', async () => {
      const mockReq = {
        headers: {
          authorization: 'token',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(axios, 'post').mockResolvedValue({
        status: 200,
        data: {
          data: {
            username: 'username',
            role: 'developer',
          },
        },
      });
      const mockNext = jest.fn();
      await validateUserToken(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });

    it('should call next if token is valid', async () => {
      const mockReq = {
        headers: {
          authorization: 'token',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(axios, 'post').mockResolvedValue({
        status: 200,
        data: {
          data: {
            username: 'username',
            role: 'user',
          },
        },
      });
      const mockNext = jest.fn();
      await validateUserToken(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
  describe('validateAdminToken', () => {
    it('should return 401 if token is not provided', async () => {
      const mockReq = {
        headers: {},
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(axios, 'post').mockRejectedValue({
        response: {
          status: 401,
          error: 'token is not provided',
        },
      });
      const mockNext = jest.fn();
      await validateAdminToken(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });
    it('should return 403 if roole is not admin', async () => {
      const mockReq = {
        headers: {
          authorization: 'token',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(axios, 'post').mockResolvedValue({
        status: 200,
        data: {
          data: {
            username: 'username',
            role: 'user',
          },
        },
      });
      const mockNext = jest.fn();
      await validateAdminToken(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });

    it('should call next if token is valid', async () => {
      const mockReq = {
        headers: {
          authorization: 'token',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(axios, 'post').mockResolvedValue({
        status: 200,
        data: {
          data: {
            username: 'username',
            role: 'admin',
          },
        },
      });
      const mockNext = jest.fn();
      await validateAdminToken(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
