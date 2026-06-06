const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {

  try {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token"
    });

  }

};

module.exports = auth;