export function createCategories(categories, parentId = null) {
  const categoryList = [];

  let category;
  if (parentId != null) {
    category = categories.filter((cat) => cat.parentId === parentId);
  } else {
    category = categories.filter((cat) => cat.parentId === "");
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      title: cate.title,
      url: cate.url,
      parentId: cate.parentId,
      description: cate.description,
      author: cate.author,
      activated: cate.activated,
      subs: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}
