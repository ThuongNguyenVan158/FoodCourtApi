import { Op } from "sequelize";
import { Food, category } from "../models";

const addFood = async (req, res) => {
  const { name, type, description, price } = req.body;
  const quantity_order = 0;
  console.log(name, type, description, price, quantity_order);
  try {
    const newFood = await Food.create({
      name,
      category_id,
      description,
      price,
      quantity_order,
    });
    res.status(201).send(newFood);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailFood = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findOne({ where: { id } });
    res.status(200).send(food);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getListFoodbyName = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      const listFood = await Food.findAll({
        where: { active: 1 },
        include: [
          {
            model: category,
          },
        ],
      });
      res.status(200).send(listFood);
    } else {
      const listFood = await Food.findAll({
        where: {
          [Op.like]: `%${name}%`,
        },
      });
      res.status(200).send(listFood);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getListFoodByPriceASC = async (req, res) => {
  try {
    const listFood = await Food.findAll({
      order: [["price", "ASC"]],
    });
    res.status(200).send(listFood);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getListFoodByPriceDESC = async (req, res) => {
  try {
    const listFood = await Food.findAll({
      order: [["price", "DESC"]],
    });
    res.status(200).send(listFood);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getListFoodByType = async (req, res) => {
  const type = req.body;
  try {
    const listFood = await Food.findAll({
      where: {
        type: type,
      },
    });
    res.status(200).send(listFood);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateFood = async (req, res) => {
  const { name, type, description, price } = req.body;
  const { id } = req.params;
  try {
    await Food.update({ name, type, description, price }, { where: { id } });
    res.status(200).send("Update successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeFood = async (req, res) => {
  const { id } = req.params;
  try {
    await Food.destroy(id);
    res.status(200).send("Delete successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadImgFood = async (req, res) => {
  const { id } = req.params;
  const file = req.file;
  const url = `http://localhost:5000/${file.path}`;
  try {
    const img_path = await Food.findOne({
      where: { id },
    });
    img_path.food_img = url;
    await img_path.save();
    res.status(200).send(img_path);
  } catch (error) {
    req.status(500).send(error);
  }
};
const getallfoodAsync = async(req,res)=>
{
  try {
    const listFood = await Food.findAll();
    res.status(200).send(listFood);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getallCategoryAsync = async(req,res)=>
{
  try {
    const listFood = await category.findAll()
    res.status(200).send(listFood);
  } catch (error) {
    res.status(500).send(error);
  }
};
export {
  addFood,
  getListFoodbyName,
  getListFoodByType,
  getListFoodByPriceASC,
  getListFoodByPriceDESC,
  updateFood,
  removeFood,
  uploadImgFood,
  getDetailFood,
  getallfoodAsync,
  getallCategoryAsync,
};
