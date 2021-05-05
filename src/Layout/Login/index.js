import React from 'react';
import Login from '../../components/authen/login';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

function LayoutLogin(props) {
    return (
        <>
            <Header />
            <Login />
            <Footer />
        </>
    );
}

export default LayoutLogin;