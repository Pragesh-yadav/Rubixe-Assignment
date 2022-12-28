const jwt = require("jsonwebtoken");


const authentication = async function (req, res, next) {
    try {
      const token = req.headers["header-token"]; //Setting token from the header
      if (!token) {
        //Checking if token having value
        return res
          .status(401)
          .send({ status: false, msg: "Token does not exist" });
      }
      const decodeToken = jwt.verify(token, "RUBIXE"); //Decoding loggedin person token
      //console.log(decodeToken);
      if (!decodeToken) {
        return res.status(401).send({ status: false, msg: "Token is invalid" });
      }
      next();
    } catch (err) {
      return res.status(500).send({ status: false, msg: err.message });
    }
  };


module.exports.authentication = authentication