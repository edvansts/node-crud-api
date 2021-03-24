const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).send({ error: "No Token provided" });

  const parts = authorization.split(" ");

  if (parts.length !== 2) return res.status(401).send({ error: "Token error" });

  const [schema, token] = parts;

  if (!/^Bearer$/.test(schema))
    return res.status(401).send({ error: "Token schema error" });

  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error) return res.status(401).send({ error: "Invalid token" });

    req.userId = decoded.id;
    return next();
  });
};
