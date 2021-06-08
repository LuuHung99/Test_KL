import React, { useState, useEffect } from "react";
import axios from "axios";

function ApiV1(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    let res = axios.get("http://localhost:5000/api/root/frontend");
    res
      .then((response) => {
        let r = createCategories(response.data);
        
        setData(r);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function createCategories(categories, parentId = null) {
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
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default ApiV1;
