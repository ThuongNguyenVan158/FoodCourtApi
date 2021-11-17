import express from "express";
import {
  changePassword,
  getDetailsCus,
  login,
  register,
  removeCus,
  updateCustomer,
  getListCustomer,
} from "../controllers/customer.controller";
import { checkEmailDuplicate } from "../middlewares/Validation/Email-exist";
import { authenticate } from "../middlewares/Auth/authenticate";
import { authorizeUser } from "../middlewares/Auth/authorize";
const customerRouter = express.Router();
customerRouter.post("/register", checkEmailDuplicate, register);
customerRouter.post("/login", login);
customerRouter.get(
  "/",
  authenticate,
  authorizeUser(["admin,superAdmin"]),
  getListCustomer
);
customerRouter.get(":/id", authenticate, getDetailsCus);
customerRouter.put("/updateCus/:id", authenticate, updateCustomer);
customerRouter.put("changePwd/:id", authenticate, changePassword);
customerRouter.delete(
  "/deleteCus/:id",
  authenticate,
  authorizeUser(["admin", "superAdmin"]),
  removeCus
);
export { customerRouter };
