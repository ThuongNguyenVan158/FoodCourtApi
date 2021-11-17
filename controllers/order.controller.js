import { Order, OrderItem, Customer } from "../models";
const ordering = async (req, res) => {
  const { customer_id, items, total_amount } = req.body;
  try {
    const newOrder = await Order.create({
      customer_id,
      total_amount,
    });
    await items.forEach((element) => {
      await OrderItem.create({
        order_id: newOrder.id,
        quantity: element.quantity,
        total_amount: element.total_amount,
        food_id: element.food_id,
      });
    });
    res.status(201).send(newOrder);
  } catch (error) {
    res.status(500).send(error);
  }
};
const viewListOrder = async (req, res) => {
  try {
    const list = await Order.findAll({
      include: [
        {
          model: OrderItem,
        },
      ],
    });
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send(error);
  }
};
const viewOrderByCustomer = async (req, res) => {
  const customer_id = req.user.id;
  try {
    const listOrder = await Customer.findAll({
      where: { id: customer_id },
      include: [
        {
          model: Order,
          include: [
            {
              model: OrderItem,
            },
          ],
        },
      ],
    });
    res.status(200).send(listOrder);
  } catch (error) {
    res.status(500).send(error);
  }
};
export { ordering, viewListOrder, viewOrderByCustomer };
