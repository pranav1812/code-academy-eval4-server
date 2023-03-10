const axios = require('axios');
const { authHost } = require('../../utils/config');

const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const authUrl = `${authHost}/api/auth/validateToken`;

const validateUserToken = async (req, res, next) => {
  try {
    const authResponse = await axios.post(authUrl, {
      token: req.headers.authorization,
    });
    const { username, role } = authResponse.data.data;
    // admin can also access user routes
    if (![ROLES.USER, ROLES.ADMIN].includes(role)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    req.user = {
      username,
      role,
    };
    next();
    return 0;
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const validateAdminToken = async (req, res, next) => {
  try {
    const authResponse = await axios.post(authUrl, {
      token: req.headers.authorization,
    });
    const { username, role } = authResponse.data.data;
    if (role !== ROLES.ADMIN) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    req.user = {
      username,
      role,
    };
    next();
    return 0;
  } catch (error) {
    if (error.response) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  validateUserToken,
  validateAdminToken,
};
