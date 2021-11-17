import { Customer } from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
const register = async (req, res) => {
  const { name, email, password, phone, username } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hasspw = bcrypt.hashSync(password, salt);
    const newCustomer = await Customer.create({
      name,
      email,
      password: hasspw,
      phone,
      username,
    });
    res.status(201).send(newCustomer);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const customer1 = await Customer.findOne({
      where: { email },
    });
    const isAuthenticated = bcrypt.compareSync(password, customer1.password);
    if (isAuthenticated) {
      const token = jwt.sign(
        {
          username: customer1.username,
          email: customer1.email,
          id: customer1.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      const customer = {
        email: customer1.email,
        username: customer1.username,
        name: customer1.name,
        phone: customer1.phone,
        id: customer1.id,
      };
      res.status(200).send({
        message: "Đăng nhập thành công",
        token,
        customer,
      });
    } else {
      res.status(403).send({ message: "Tài khoản hoặc mật khẩu không đúng" });
    }
  } catch (error) {
    res.status(403).send({ message: "Tài khoản hoặc mật khẩu không đúng" });
  }
};
const getListCustomer = async (req, res) => {
  const { name } = req.body;
  try {
    if (name) {
      const listCustomer = await Customer.findAll({
        where: {
          name: {
            [Op.like]: `%${name}$`,
          },
        },
      });
      res.status(200).send(listCustomer);
    } else {
      const listCustomer = await Customer.findAll();
      res.status(200).send(listCustomer);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
const updateCustomer = async (req, res) => {
  const { email, name, username, phone } = req.body;
  const { id } = req.params;
  const { user } = req;
  try {
    if (user.id == id) {
      await Customer.update(
        {
          email,
          phone,
          username,
          name,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).send({ message: "Update successfully!" });
    } else {
      res.status(403).send({ message: "Token not accepted" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getDetailsCus = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  try {
    if (user.id === id) {
      const detailCus = await Customer.findOne({
        where: { id },
      });
      res.status(200).send(detailCus);
    } else
      return res.status(401).send("Không thể xem chi tiết người dùng này !");
  } catch (error) {
    res.status(500).send(error);
  }
};
const changePassword = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  try {
    if (user.id === id) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      await Customer.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).send({ message: "Change successfully" });
    } else {
      res.status(403).send({ message: "Lỗi xác thực" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const removeCus = async (req, res) => {
  const { id } = req.params;
  try {
    await Customer.destroy({
      where: { id },
    });
    res.status(200).send("Remove completed successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};
export {
  register,
  login,
  getListCustomer,
  updateCustomer,
  getDetailsCus,
  changePassword,
  removeCus,
};
