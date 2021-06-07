import axios from "axios";
import  { useState, useEffect } from "react";

export const ProductApi = async() => {
    const url = "http://localhost:5000/api/root/frontend";
    const response = await axios.get(url);
    const result = await response.status === 200 ? await response.data : [];
    console.log("result",result);
    return result;
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //   let res = axios.get("http://localhost:5000/api/root/frontend");
    //   res
    //     .then((response) => {
    //       let r = createCategories(response.data);
    //       setData(r);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, []);
    // function createCategories(categories, parentId = null) {
    //   const categoryList = [];
  
    //   let category;
    //   if (parentId != null) {
    //     category = categories.filter((cat) => cat.parentId === parentId);
    //   } else {
    //     category = categories.filter((cat) => cat.parentId === "");
    //   }

    //   for (let cate of category) {
    //     categoryList.push({
    //       _id: cate._id,
    //       title: cate.title,
    //       url: cate.path,
    //       parentId: cate.parentId,
    //       description: cate.description,
    //       author: cate.author,
    //       activated: cate.activated,
    //       subs: createCategories(categories, cate._id),
    //     });
    //   }
  
    //   return categoryList;
    // }
 
  }
  
 
  