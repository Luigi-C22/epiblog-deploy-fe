import React from 'react';
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";

const MainLayout = ({children}) => {
    return (
        <>
            <Navbar/>
            {children}
            <Footer/>
        </>
    );
};

export default MainLayout;