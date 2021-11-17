import JsonWebToken from "jsonwebtoken";
const authenticate = (req, res, next) => {
  const token = req.header("token");

  try {
    const decode = JsonWebToken.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decode) {
      req.user = decode;
      next();
    } else res.status(401).send("Bạn chưa đăng Nhập");
  } catch (error) {
    res.status(401).send("Bạn chưa đăng Nhập");
  }
};

export { authenticate };
