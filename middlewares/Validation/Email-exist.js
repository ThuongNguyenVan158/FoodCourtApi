const { Customer, Admin } = require("../../models");

const checkEmailDuplicate = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Customer.findOne({
      where: { email },
    });
    if (user) {
      console.log(user);
      res.status(406).send("Email đã tồn tại");
    } else next();
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { checkEmailDuplicate };
const checkEmailDuplicateAdmin = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Admin.findOne({
      where: { email },
    });
    if (user) {
      console.log(user);
      res.status(406).send("Email đã tồn tại");
    } else next();
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { checkEmailDuplicate, checkEmailDuplicateAdmin };
