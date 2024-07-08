const jwt = require("jsonwebtoken");

const access_token = process.env.ACCESS_TOKEN;

// verify jwt token
const verifyToken = (req, res, next) => {
  // console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized access!" });
  }

  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  jwt.verify(token, access_token, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "token is invalid!" });
    }
    // console.log(decoded);
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;
