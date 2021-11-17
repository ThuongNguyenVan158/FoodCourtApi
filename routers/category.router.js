import express from "express";
import {
    addCate,
    getallCategoryAsync,
} from "../controllers/category.controller";
import { authenticate } from "../middlewares/Auth/authenticate";
import { authorizeUser } from "../middlewares/Auth/authorize";
const categoryRouter = express.Router();
categoryRouter.post(
  "/addCategory",
  authenticate,
  authorizeUser(["admin", "superAdmin"]),
  addCate
);

categoryRouter.get("/getListCategory", getallCategoryAsync);
// categoryRouter.put(
//   "updateFood/:id",
//   authenticate,
//   authorizeUser(["admin", "superAdmin"]),
//   updateFood
// );
// categoryRouter.post(
//   "/uploadImg/:id",
//   authenticate,
//   authorizeUser(["admin", "superAdmin"]),
//   uploadImage("food-img"),
//   uploadImgFood
// );
// categoryRouter.delete(
//   "/deleteFood/:id",
//   authenticate,
//   authorizeUser(["admin", "superAdmin"]),
//   removeFood
// );
export { categoryRouter };
