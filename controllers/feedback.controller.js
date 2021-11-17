import { Feedback, Food, Customer } from "../models";
const addFeedback = async (req, res) => {
  const { rating, comment, food_id } = req.body;
  const customer_id = req.user.id;
  try {
    const newFeedback = await Feedback.create({
      rating,
      comment,
      customer_id,
      food_id,
    });
    res.status(201).send(newFeedback);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllFeedback = async (req, res) => {
  const { food_id } = req.params;
  try {
    const list = await Feedback.findAll({
      where: { food_id },
      include: [
        {
          model: Food,
        },
        {
          model: Customer,
        },
      ],
    });
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateFeedback = async (req, res) => {};
const deleteFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    await Feedback.destroy({
      where: { id },
    });
    res.status(200).send("Delete successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
};
export { addFeedback, updateFeedback, deleteFeedback, getAllFeedback };
