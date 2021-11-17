import { Op } from "sequelize";
import { category } from "../models";

const addCate = async (req, res) => {
  const { name, img_url} = req.body;
  console.log(name, img_url);
  try {
    const newCategory = await category.create({
      name,
      img_url,
    });
    res.status(201).send(newCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};
// const updateCate = async (req, res) => {
  // const { name, type, description, price } = req.body;
  // const { id } = req.params;
  // try {
    // await Food.update({ name, type, description, price }, { where: { id } });
    // res.status(200).send("Update successfully");
  // } catch (error) {
    // res.status(500).send(error);
  // }
// };

// const removeCate = async (req, res) => {
  // const { id } = req.params;
  // try {
    // await Food.destroy(id);
    // res.status(200).send("Delete successfully");
  // } catch (error) {
    // res.status(500).send(error);
  // }
// };
const getallCategoryAsync = async(req,res)=>
{
  try {
    const listFood = await category.findAll()
    res.status(200).send(listFood);
  } catch (error) {
    res.status(500).send(error);
  }
};
export{addCate,getallCategoryAsync};