const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("User is not authorized");
        }
        req.user = decoded.user;
        next();
      });

      if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
      }
    } else {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { validateToken };
