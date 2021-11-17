import { Admin } from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {v4 as uuid} from "uuid"
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin1 = await Admin.findOne({
      where: {
        email: email,
      },
    });
    //let isAuthenticated;
    // if (admin1.email == "Nhật@gmail.com" && admin1.password == "123456") {
    //   isAuthenticated = true;
    //   const salt = bcrypt.genSaltSync(10);
    //   const hasspw = bcrypt.hashSync(password, salt);
    //   admin1.password = hasspw;
    //   await admin1.save();
    // } else
    const isAuthenticated = bcrypt.compareSync(password, admin1.password);
    if (isAuthenticated == true) {
      const token = jwt.sign(
        {
          username: admin1.username,
          email: admin1.email,
          id: admin1.id,
          type: admin1.type,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      const admin = {
        email: admin1.email,
        username: admin1.username,
        name: admin1.name,
        id: admin1.id,
      };
      return res.status(200).send({
        message: "Đăng nhập thành công",
        token,
        admin,
      });
    } else {
      return res
        .status(403)
        .send({ message: "Tài khoản hoặc mật khẩu không đúng" });
    }
  } catch (error) {
    res.status(403).send({ message: "Tài khoản hoặc mật khẩu không đúng" });
  }
};
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, username } = req.body;
  const { user } = req;
  try {
    if (user.id == id) {
      await Admin.update({ name, email, username }, { where: { id: id } });
      res.status(200).send({ message: "Update successfully" });
    } else res.status(403).send({ message: "Không thể cập nhật" });
  } catch (error) {
    res.status(500).send(error);
  }
};
const addAdmiAccount = async (req, res) => {
  const { name, email, username, password, type } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newAdmin = await Admin.create({
      name,
      email,
      type,
      username,
      password: hashPassword,
    });
    res.status(201).send(newAdmin);
  } catch (error) {
    res.status(500).send(error);
  }
};
const removeAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await Admin.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Remove completed");
  } catch (error) {
    res.status(500).send(error);
  }
};
const getallEmployeeAsync = async(req,res)=>
{
  try {
    const listAccount = await Admin.findAll()
    res.status(200).send(listAccount);
  } catch (error) {
    res.status(500).send(error);
  }
};
export { loginAdmin, updateAdmin, addAdmiAccount, removeAdmin,getallEmployeeAsync };
