const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  const cat = await Category.find({});
  const categories = [];
  cat.forEach((item, index) => {
    categories.push({
      id: item._id,
      title: item.title,
      subcategories: item.subcategories.map((subcategory) => {
        return {
          id: subcategory._id,
          title: subcategory.title,
        };
      }),
    });
  });
  ctx.body = {categories};
};
