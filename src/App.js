import React from 'react';
import "antd/dist/antd.css";
import AppRouter from './pages/index';
import ProductApi from './views/ProductApi';
import TabData from './pages/dashbroad/products/tabData';
import ApiV1 from './services/apiv1';

function App() {
  return (
    <div >
        <AppRouter />
        {/* <TabData /> */}
        {/* <ProductApi /> */}
    </div>
  );
}

export default App;
