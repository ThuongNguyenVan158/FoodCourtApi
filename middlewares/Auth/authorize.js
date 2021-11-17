const authorizeUser = (arrayType) => (req, res, next) => {
  const user = req.user;
  if (arrayType.findIndex((element) => element == user.type) > -1) {
    next();
  } else res.status(403).send("Bạn đã đăng nhập nhưng không có quyền");
};
module.exports = { authorizeUser };
