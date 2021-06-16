import React, { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import AppRouter from './pages/index';
import { ProductApi } from './services/api';
import { createCategories } from './services/middlewares';
 
function App() {
  const [data, setData] = useState([])
  window.store = {"products": createCategories(data), "products2": data}

  useEffect(() => {
    const getData = async() => {
      const dataFake = await ProductApi();
      if (dataFake) {
        setData(dataFake)
      }
    }
    getData()
  }, [])
  return (
    <div >
        <AppRouter />
    </div>
  );
}

export default App;
