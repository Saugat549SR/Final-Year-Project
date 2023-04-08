const Category = require('../models/category');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;

  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      title: cate.title,
      slug: cate.slug,
      parentId: cate.parentId,
    });
  }
  return categoryList;
}

exports.newCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const categoryObj = {
      title: req.body.title,
    };

    const cat = new Category(categoryObj);
    const savedCategory = await cat.save();
    return res.status(201).json({ category: savedCategory });
  } catch (error) {
    return res.status(400).json({ error });
  }
});
