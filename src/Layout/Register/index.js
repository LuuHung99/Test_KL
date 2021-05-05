import React from 'react';
import Register from '../../components/authen/register';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

function RegisterLayout(props) {
    return (
        <>
            <Header />
            <Register />
            <Footer />
        </>
    );
}

export default RegisterLayout;