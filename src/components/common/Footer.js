import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;
function FooterTest(props) {
    return (
        <Layout >
            <Footer style={{ textAlign: "center", fontSize: '20px' }}>Ant Design ©2021 Created by LH Dev</Footer>
        </Layout>
    );
}

export default FooterTest;