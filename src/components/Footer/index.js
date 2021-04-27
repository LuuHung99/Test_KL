import React from 'react';
import { Layout } from 'antd';
import './css/footer.css';
const { Footer } = Layout;
function FooterTest(props) {
    return (
        <Layout >
            <Footer  className="footer__name">Ant Design ©2021 Created by LH Dev</Footer>
        </Layout>
    );
}

export default FooterTest;