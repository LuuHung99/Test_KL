// import React, { useState } from "react";
// import "antd/dist/antd.css";
// import "./css/product.css";
// import { Layout, Button, Tabs } from "antd";

// import { initData } from "../../../services/api";

// const { Content } = Layout;

// const { TabPane } = Tabs;

// const initialPanes = [
//   {
//       title: "Tab 1",
//       content: "Content of Tab 1",
//       key: "1"
//   },

//   {
//       title: "Tab 2",
//      content: "Content of Tab 2",
//      key: "2"
//   },

//   {
//     title: "Tab 3",
//     content: "Content of Tab 3",
//     key: "3",
//     // closable: false,
//   },
// ];

// class Products extends React.Component {
//    newTabIndex = 0;

//   state = {
//     activeKey: initialPanes[0].key,
//     panes: initialPanes,
//   };

//   onChange = (activeKey) => {
//     this.setState({ activeKey });
//   };

//   onEdit = (targetKey, action) => {
//     this[action](targetKey);
//   };

//   add = () => {
//     const { panes } = this.state;
//     const activeKey = `newTab${this.newTabIndex++}`;
//     const newPanes = [...panes];
//     newPanes.push({
//       title: "New Tab",
//       content: "Content of new Tab",
//       key: activeKey,
//     });
//     this.setState({
//       panes: newPanes,
//       activeKey,
//     });
//   };

//   remove = (targetKey) => {
//     const { panes, activeKey } = this.state;
//     let newActiveKey = activeKey;
//     let lastIndex;
//     panes.forEach((pane, i) => {
//       if (pane.key === targetKey) {
//         lastIndex = i - 1;
//       }
//     });
//     const newPanes = panes.filter((pane) => pane.key !== targetKey);
//     if (newPanes.length && newActiveKey === targetKey) {
//       if (lastIndex >= 0) {
//         newActiveKey = newPanes[lastIndex].key;
//       } else {
//         newActiveKey = newPanes[0].key;
//       }
//     }
//     this.setState({
//       panes: newPanes,
//       activeKey: newActiveKey,
//     });
//   };
//   // const [collapse, setCollapse] = useState(false);
//   // const [data, setData] = useState(initData);
//   // function renderList() {
//   //   return (
//   //     Array.isArray(data) &&
//   //     data
//   //       .filter((x) => x.id === 2)
//   //       .map((text, index) => {
//   //         return (
//   //           <ul key={index}>
//   //             {Array.isArray(text.titles) &&
//   //               text.titles.map((item, index) => {
//   //                 return (
//   //                   <li key={index}>
//   //                     {Array.isArray(item.details) &&
//   //                       item.details.map((text, index) => {
//   //                         return <Button key={index} className="btn-button">{text.title}</Button>;
//   //                       })}
//   //                   </li>
//   //                 );
//   //               })}
//   //           </ul>
//   //         );
//   //       })
//   //   );
//   // }
//   // function renderDetailsList() {
//   //   return (
//   //     <div
//   //       className="site-layout-background"
//   //       style={{ padding: 24, textAlign: "center" }}
//   //     >
//   //       ...
//   //       <br />
//   //       Really
//   //       content
//   //     </div>
//   //   );
//   // }
//   render() {
//     const { panes, activeKey } = this.state;

//     return (
//       <>
//         <Layout
//           className="site-layout"
//           style={{
//             marginLeft: 200,
//             marginTop: "64px",
//             backgroundColor: "#BDBDBD",
//           }}
//         >
//           <Tabs
//             type="editable-card"
//             onChange={this.onChange}
//             activeKey={activeKey}
//             onEdit={this.onEdit}
//             style={{ margin: "0px 20px", marginTop: "20px" }}
//           >
//             {panes.map((pane) => (
//               <TabPane
//                 tab={pane.title}
//                 key={pane.key}
//                 closable={pane.closable}
//                 style={{ backgroundColor: "#fff" }}
//               >
//                 {pane.content}
//               </TabPane>
//             ))}
//           </Tabs>
//         </Layout>
//       </>
//     );
//   }
// }

// export default Products;

import React, { useState } from "react";
import "antd/dist/antd.css";
import "./css/product.css";
import { Layout, Tabs } from "antd";

const { TabPane } = Tabs;

const initialPanes = [
  {
    title: "Tab 1",
    content: "Content of Tab 1",
    key: "1",
  },

  {
    title: "Tab 2",
    content: "Content of Tab 2",
    key: "2",
  },

  {
    title: "Tab 3",
    content: "Content of Tab 3",
    key: "3",
  },
];

function Products(props) {
  const [activeKey, setActiveKey] = useState(initialPanes[0].key);
  const [panes, setPanes] = useState(initialPanes);

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  //  const onEdit = (targetKey, action) => {
  //     this[action](targetKey);
  //   };

  // const add = () => {
  //   const newTabIndex = 0;

  //   // const { panes } = this.state;
  //   const activeKeys = `newTab${newTabIndex+1}`;
  //   const newPanes = [...panes];
  //   newPanes.push({
  //     title: "New Tab",
  //     content: "Content of new Tab",
  //     key: activeKeys,
  //   });
  //   setPanes(newPanes);
  //   // setActiveKey(activeKeys);

  //   // this.setState({
  //   //   panes: newPanes,
  //   //   activeKey,
  //   // });
  // };

  const remove = (targetKey) => {
    console.log("key: ", targetKey);

    const newPanes = panes.filter((pane) => pane.key !== targetKey);

    setPanes(newPanes);
  };

  return (
    <>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
          marginTop: "64px",
          backgroundColor: "#BDBDBD",
        }}
      >
        <Tabs
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey}
          onEdit={remove}
          // onEdit={onEdit}
          style={{ margin: "0px 20px", marginTop: "20px" }}
        >
          {panes.map((pane) => (
            <TabPane
              tab={pane.title}
              key={pane.key}
              closable={pane.closable}
              style={{ backgroundColor: "#fff" }}
            >
              {pane.content}
            </TabPane>
          ))}
        </Tabs>
      </Layout>
    </>
  );
}

export default Products;
