const category = require("../Model/category");

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    // Check if the email already exists
    const existingCategory = await category.findOne({ name: name });
    if (existingCategory) {
      return res.status(400).json({ message: "category already exists" });
    }
    const categoryData = {
      name,
    };
    await category.create(categoryData);
    res
      .status(201)
      .json({
        message: "category created successfully",
        status: true,
        data: categoryData,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCategory = async (req, res) => {
  const { categoryId, name } = req.body;
  try {
    const updatedCategory = await category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({
      status: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.body;
  try {
    const deletedCategory = await category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" ,status: true});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const categories = await category.find();
    res.json({
      message: "Category fetched successfully",
      status: true,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
};
