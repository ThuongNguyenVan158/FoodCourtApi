import express from "express";
import {
  addFeedback,
  deleteFeedback,
  getAllFeedback,
} from "../controllers/feedback.controller";
import { authenticate } from "../middlewares/Auth/authenticate";
const feedbackRouter = express.Router();
feedbackRouter.post("/add", authenticate, addFeedback);
feedbackRouter.get("/:food_id", getAllFeedback);
feedbackRouter.delete("/delete/:id", deleteFeedback);
export { feedbackRouter };
